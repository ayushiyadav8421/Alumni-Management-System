import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const DB_PATH = path.join(__dirname, 'db.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(UPLOADS_DIR));

// MySQL Connection Pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'alumni_portal_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test Database Connection
pool.getConnection()
    .then(connection => {
        console.log('✓ MySQL Connected Successfully');
        connection.release();
    })
    .catch(err => {
        console.error('✗ MySQL Connection Failed:', err.message);
        console.log('  Please check your .env file and ensure MySQL is running.');
    });

// Configure Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_DIR);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Helper to read JSON DB (for other entities)
const readDB = () => {
    if (!fs.existsSync(DB_PATH)) {
        return { donations: [], contactMessages: [], jobs: [], events: [] };
    }
    const data = fs.readFileSync(DB_PATH, 'utf8');
    const db = JSON.parse(data);
    if (!db.donations) db.donations = [];
    if (!db.contactMessages) db.contactMessages = [];
    if (!db.jobs) db.jobs = [];
    if (!db.events) db.events = [];
    if (!db.messages) db.messages = [];
    return db;
};

const writeDB = (data) => {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

// --- Routes ---

// Events Routes
app.get('/api/events', (req, res) => {
    const db = readDB();
    const { school } = req.query;
    let events = db.events || [];
    
    if (school) {
        events = events.filter(e => e.school && e.school.toUpperCase() === school.toUpperCase());
    }
    
    const sortedEvents = events.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
    res.json(sortedEvents);
});

app.post('/api/events', upload.single('eventImage'), (req, res) => {
    const db = readDB();
    const newEvent = {
        id: Date.now(),
        ...req.body,
        imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
        timestamp: new Date().toISOString()
    };
    db.events.push(newEvent);
    writeDB(db);
    res.status(201).json({ message: 'Event added successfully', event: newEvent });
});

// Donation Routes
app.post('/api/donations', (req, res) => {
    const db = readDB();
    const newDonation = {
        id: Date.now(),
        ...req.body,
        timestamp: new Date().toISOString()
    };
    db.donations.push(newDonation);
    writeDB(db);
    res.status(201).json({ message: 'Donation recorded successfully', donation: newDonation });
});

app.get('/api/donations', (req, res) => {
    const db = readDB();
    res.json(db.donations || []);
});

// Contact Routes
app.post('/api/contact-message', upload.single('attachment'), (req, res) => {
    const db = readDB();
    const newMessage = {
        id: Date.now(),
        ...req.body,
        attachmentUrl: req.file ? `/uploads/${req.file.filename}` : null,
        attachmentName: req.file ? req.file.originalname : null,
        timestamp: new Date().toISOString()
    };
    db.contactMessages.push(newMessage);
    writeDB(db);
    res.status(201).json({ message: 'Contact message sent successfully', messageData: newMessage });
});

app.get('/api/contact-messages', (req, res) => {
    const db = readDB();
    res.json(db.contactMessages || []);
});

// Alumni Routes (MySQL with JSON Fallback)
app.post('/api/alumni', upload.single('profilePhoto'), async (req, res) => {
    try {
        const { fullName, email, password, school, department, batchYear, companyName, jobTitle, location, linkedin, bio, salary } = req.body;
        const profile_image = req.file ? `/uploads/${req.file.filename}` : null;
        const salaryNum = salary ? parseFloat(salary) : 0;

        try {
            const [result] = await pool.execute(
                `INSERT INTO alumni (fullName, email, password, school, department, batchYear, companyName, jobTitle, location, linkedin, bio, profile_image, salary) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [fullName, email, password, school, department, batchYear, companyName, jobTitle, location, linkedin, bio, profile_image, salaryNum]
            );
            return res.status(201).json({ message: 'Registration successful (MySQL)', id: result.insertId });
        } catch (dbError) {
            console.warn('MySQL Insert Failed, falling back to JSON:', dbError.message);
            const db = readDB();
            if (!db.alumni) db.alumni = [];
            const newAlumnus = {
                id: Date.now(),
                fullName, email, password, school, department, batchYear, companyName, jobTitle, location, linkedin, bio,
                salary: salaryNum,
                profilePhotoUrl: profile_image,
                timestamp: new Date().toISOString()
            };
            db.alumni.push(newAlumnus);
            writeDB(db);
            return res.status(201).json({ message: 'Registration successful (JSON Fallback)', id: newAlumnus.id });
        }
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ error: 'Internal server error during registration' });
    }
});

app.get('/api/alumni', async (req, res) => {
    try {
        const { school } = req.query;
        try {
            let query = 'SELECT * FROM alumni';
            const params = [];
            if (school) {
                query += ' WHERE UPPER(school) = ?';
                params.push(school.toUpperCase());
            }
            query += ' ORDER BY timestamp DESC';
            const [rows] = await pool.execute(query, params);
            return res.json(rows);
        } catch (dbError) {
            console.warn('MySQL Fetch Failed, falling back to JSON:', dbError.message);
            const db = readDB();
            let alumni = db.alumni || [];
            if (school) {
                alumni = alumni.filter(a => a.school && a.school.toUpperCase() === school.toUpperCase());
            }
            return res.json(alumni);
        }
    } catch (error) {
        console.error('Fetch Error:', error);
        res.status(500).json({ error: 'Internal server error while fetching alumni' });
    }
});

// New Endpoints: Top Achievers and School Counts
app.get('/api/alumni/top-achievers', async (req, res) => {
    try {
        let alumni = [];
        try {
            const [rows] = await pool.execute('SELECT * FROM alumni');
            alumni = rows;
        } catch (dbError) {
            console.warn('MySQL Fetch for Top Achievers Failed, falling back to JSON:', dbError.message);
            const db = readDB();
            alumni = db.alumni || [];
        }

        const schools = ['SEAS', 'ESLA', 'PSB'];
        const topAchievers = schools.map(school => {
            const schoolAlumni = alumni.filter(a => a.school && a.school.toUpperCase() === school.toUpperCase());
            if (schoolAlumni.length === 0) return null;
            return schoolAlumni.sort((a, b) => (b.salary || 0) - (a.salary || 0))[0];
        }).filter(Boolean);

        res.json(topAchievers);
    } catch (error) {
        console.error('Top Achievers Error:', error);
        res.status(500).json({ error: 'Internal server error fetching top achievers' });
    }
});

app.get('/api/alumni/count-by-school', async (req, res) => {
    try {
        let alumni = [];
        try {
            const [rows] = await pool.execute('SELECT school FROM alumni');
            alumni = rows;
        } catch (dbError) {
            console.warn('MySQL Fetch for School Counts Failed, falling back to JSON:', dbError.message);
            const db = readDB();
            alumni = db.alumni || [];
        }

        const counts = alumni.reduce((acc, curr) => {
            const school = curr.school ? curr.school.toUpperCase() : 'UNKNOWN';
            acc[school] = (acc[school] || 0) + 1;
            return acc;
        }, {});

        res.json(counts);
    } catch (error) {
        console.error('School Counts Error:', error);
        res.status(500).json({ error: 'Internal server error fetching school counts' });
    }
});

app.put('/api/alumni/:id', upload.single('profilePhoto'), async (req, res) => {
    const { id } = req.params;
    try {
        const { fullName, email, school, department, batchYear, companyName, jobTitle, location, linkedin, bio, salary, phoneNumber } = req.body;
        const profile_image = req.file ? `/uploads/${req.file.filename}` : undefined;
        const salaryNum = salary ? parseFloat(salary) : undefined;

        try {
            // MySQL Update
            let updateQuery = 'UPDATE alumni SET fullName=?, email=?, school=?, department=?, batchYear=?, companyName=?, jobTitle=?, location=?, linkedin=?, bio=?';
            let params = [fullName, email, school, department, batchYear, companyName, jobTitle, location, linkedin, bio];
            
            if (salaryNum !== undefined) {
                updateQuery += ', salary=?';
                params.push(salaryNum);
            }
            if (profile_image !== undefined) {
                updateQuery += ', profile_image=?';
                params.push(profile_image);
            }
            
            updateQuery += ' WHERE id=?';
            params.push(id);

            const [result] = await pool.execute(updateQuery, params);
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Alumni not found in MySQL' });
            }
            return res.json({ message: 'Profile updated successfully (MySQL)' });
        } catch (dbError) {
            console.warn('MySQL Update Failed, falling back to JSON:', dbError.message);
            const db = readDB();
            const index = db.alumni.findIndex(a => String(a.id) === String(id));
            
            if (index !== -1) {
                const updatedAlumnus = {
                    ...db.alumni[index],
                    fullName: fullName || db.alumni[index].fullName,
                    email: email || db.alumni[index].email,
                    school: school || db.alumni[index].school,
                    department: department || db.alumni[index].department,
                    batchYear: batchYear || db.alumni[index].batchYear,
                    companyName: companyName || db.alumni[index].companyName,
                    jobTitle: jobTitle || db.alumni[index].jobTitle,
                    location: location || db.alumni[index].location,
                    linkedin: linkedin || db.alumni[index].linkedin,
                    bio: bio || db.alumni[index].bio,
                    phoneNumber: phoneNumber || db.alumni[index].phoneNumber
                };
                
                if (salaryNum !== undefined) updatedAlumnus.salary = salaryNum;
                if (profile_image !== undefined) updatedAlumnus.profilePhotoUrl = profile_image;
                
                db.alumni[index] = updatedAlumnus;
                writeDB(db);
                return res.json({ message: 'Profile updated successfully (JSON Fallback)' });
            }
            return res.status(404).json({ error: 'Alumni not found in JSON' });
        }
    } catch (error) {
        console.error('Update Error:', error);
        res.status(500).json({ error: 'Internal server error during update' });
    }
});

app.delete('/api/alumni/:id', async (req, res) => {
    const { id } = req.params;
    try {
        try {
            // MySQL Deletion
            const [rows] = await pool.execute('SELECT profile_image FROM alumni WHERE id = ?', [id]);
            if (rows.length > 0 && rows[0].profile_image) {
                const filePath = path.join(__dirname, rows[0].profile_image);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }
            await pool.execute('DELETE FROM alumni WHERE id = ?', [id]);
            return res.json({ message: 'Alumni removed successfully (MySQL)' });
        } catch (dbError) {
            console.warn('MySQL Delete Failed, falling back to JSON:', dbError.message);
            const db = readDB();
            const index = db.alumni.findIndex(a => String(a.id) === String(id));
            if (index !== -1) {
                const alumnus = db.alumni[index];
                if (alumnus.profilePhotoUrl) {
                    const filePath = path.join(__dirname, alumnus.profilePhotoUrl);
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }
                db.alumni.splice(index, 1);
                writeDB(db);
                return res.json({ message: 'Alumni removed successfully (JSON Fallback)' });
            }
            return res.status(404).json({ error: 'Alumni not found in JSON' });
        }
    } catch (error) {
        console.error('Delete Error:', error);
        res.status(500).json({ error: 'Internal server error during deletion' });
    }
});

// Chat Messages Routes
app.get('/api/messages', (req, res) => {
    const db = readDB();
    const { senderId, receiverId } = req.query;
    
    if (!senderId || !receiverId) {
        return res.json(db.messages || []);
    }

    const conversation = (db.messages || []).filter(msg => 
        (String(msg.senderId) === String(senderId) && String(msg.receiverId) === String(receiverId)) ||
        (String(msg.senderId) === String(receiverId) && String(msg.receiverId) === String(senderId))
    );

    res.json(conversation);
});

app.post('/api/messages', (req, res) => {
    const db = readDB();
    const newMessage = {
        id: Date.now(),
        ...req.body,
        timestamp: new Date().toISOString()
    };
    db.messages.push(newMessage);
    writeDB(db);
    res.status(201).json(newMessage);
});

// Jobs Routes
app.post('/api/jobs', (req, res) => {
    const db = readDB();
    const newJob = {
        id: Date.now(),
        ...req.body,
        timestamp: new Date().toISOString()
    };
    db.jobs.push(newJob);
    writeDB(db);
    res.status(201).json({ message: 'Job posted successfully', job: newJob });
});

app.get('/api/jobs', (req, res) => {
    const db = readDB();
    res.json(db.jobs || []);
});

app.get('/', (req, res) => {
    res.send('Alumni Portal API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
