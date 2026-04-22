# 🎓 Alumni Management System

An intelligent Alumni Management System powered by a database based chatbot that enables users to explore alumni, events, jobs, and connect seamlessly.

🔗 **Live Demo:**  
👉 https://alumni-management-system-one.vercel.app/

---

## 🚀 Overview

This platform provides a centralized ecosystem for alumni interaction:

- 🔍 Smart alumni search  
- 🤖 AI - assisted chatbot
- 💬 Real-time chat system  
- 📅 Event and job management
- 💖 Donation System 

The chatbot is an AI-assisted conversational interface that understands user queries and dynamically retrieves relevant data from the backend database. It combines natural language processing with structured database queries to provide accurate and context-aware responses.

---

## ✨ Features

### 👩‍🎓 Alumni Directory
- Add & manage alumni profiles  
- Profile photo upload  
- Salary displayed in LPA format  
- Advanced filtering:
  - School (SEAS, ESLA, PSB)
  - Batch year
  - Company
  - Location

---

### 🤖 AI-Assisted Chatbot
- Conversational search interface for interacting with system data  
- Understands user queries and maps them to dynamic database filters  
- Retrieves real-time information from backend APIs  
- Supports contextual follow-up queries  
- Presents results (alumni, events, jobs) in an interactive chat format   

#### Example Queries
- Find alumni from SEAS 2021  
- Show top salary alumni  
- Show upcoming events  
- Jobs available  
- How to register  
- Contact information  

---

### 💬 Alumni Chat System
- One-to-one messaging  
- Smooth UI with auto-scroll  
- Real-time communication  

---

### 📅 Event Management
- Add and manage events  
- View upcoming events  
- School-specific filtering  

---

### 💼 Jobs & Placements
- Alumni job postings  
- Job listings with company & location  

---

### 🏫 School-Based System
Separate dashboards for:
- SEAS (Engineering & Sciences)  
- ESLA (Liberal Arts)  
- PSB (Business School)  

Each includes:
- Alumni Directory  
- Events  
- Chat  
- Jobs  

---

### 📂 File Uploads

**Supported formats:**
- JPG / PNG  
- PDF / DOC  

**Used for:**
- Profile images  
- Event uploads  
- Contact forms  

---

### 🔐 Authentication
- Secure login system  
- Session handling  
- Role-based access for alumni and students 

---

## 🧠 AI Capabilities
- Natural language-based query understanding  
- Dynamic mapping of user input to database filters  
- Context-aware conversational flow  
- Real-time data retrieval from backend APIs  
- Structured and interactive response generation  

---

## 🛠 Tech Stack

### Frontend
- React.js  
- Tailwind CSS  
- Vite  
- JavaScript  

### Backend
- Flask / Node.js  
- REST APIs  

### Database
- MySQL  
 

---

## 📁 Project Structure

```bash
alumni-portal/
│
├── backend/                     
│   ├── routes/                 
│   ├── utils/                  
│   ├── uploads/                
│   │
│   ├── app.py                  
│   ├── config.py               
│   ├── models.py               
│   ├── create_db.py            
│   ├── seed.py                 
│   │
│   ├── requirements.txt        
│   ├── Procfile                
│   ├── .env                    
│   └── .env.example            
│
├── public/                     
├── dist/                       
├── server/                     
│
├── src/                        
│   ├── assets/                
│   ├── context/               
│   ├── utils/                 
│
│   ├── components/            
│   │   ├── AchieversSection.jsx
│   │   ├── Chatbot.jsx
│   │   ├── EventsSection.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx
│   │   ├── ThemeToggle.jsx
│   │   ├── ViceChancellorCard.jsx
│   │   ├── ViceChancellorMessage.jsx
│   │   └── ViceChancellorPreview.jsx
│
│   ├── pages/                 
│   │   ├── Home.jsx
│   │   ├── AlumniDirectory.jsx
│   │   ├── AlumniChat.jsx
│   │   ├── Events.jsx
│   │   ├── Jobs.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Contact.jsx
│   │   ├── Donation.jsx
│   │   ├── SchoolDashboard.jsx
│   │   ├── SchoolPortal.jsx
│   │   ├── ViceChancellorFullMessage.jsx
│   │
│   │   └── About/             
│   │       ├── AdvisoryBoard.jsx
│   │       ├── CoreCommittee.jsx
│   │       ├── MessageAD.jsx
│   │       └── VisionMission.jsx
│
│   ├── App.jsx                
│   ├── main.jsx               
│   └── index.css             
│
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── vercel.json
```
---

# ⚙️ Installation & Setup

1️⃣ Clone Repository
```
git clone https://github.com/ayushiyadav8421/Alumni-Management-System.git
cd Alumni-Management-System
```
2️⃣ Run Frontend
```
npm install
npm run dev
```
3️⃣ Run Backend
```
cd backend
pip install -r requirements.txt
python app.py
```
4️⃣ Open Application

👉 https://alumni-management-system-one.vercel.app/  

---

## 📊 Core Modules
- Alumni Directory
- AI-Assisted Chatbot
- Events
- Jobs
- Chat System

--- 

## 🎯 Purpose

This project demonstrates:

Full-stack development  
AI chatbot integration  
Database management  
Authentication systems   
Real-time features 

---

## ⭐ Show Your Support    

If you like this project:  

⭐ Star the repository  
🍴 Fork it  
🛠 Contribute  