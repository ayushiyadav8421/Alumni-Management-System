🎓 SRM AP Alumni Portal with AI Assistant

An intelligent Alumni Management System powered by an AI chatbot that enables users to explore alumni, events, jobs, and connect seamlessly.

🔗 Live Demo:
👉 https://alumni-management-system-one.vercel.app/


🚀 Overview
```

This platform provides a centralized ecosystem for alumni interaction:

🔍 Smart alumni search
🤖 AI-powered conversational assistant
💬 Real-time chat system
📅 Event and job management

The integrated chatbot enhances user experience by retrieving live database results conversationally.
```


✨ Features
👩‍🎓 Alumni Directory
Add & manage alumni profiles
Profile photo upload
Salary displayed in LPA format
Advanced filtering:
    School (SEAS, ESLA, PSB)
    Batch year
    Company
    Location
    Salary range

🤖 AI Chatbot Assistant
ChatGPT-style conversational interface
Fetches real-time data from backend
Context-aware responses
Supports follow-up questions
Displays results inside chat

Example Queries
Find alumni from SEAS 2021
Show top salary alumni
Show upcoming events
Jobs available
How to register
Contact information

💬 Alumni Chat System
One-to-one messaging
Smooth UI with auto-scroll
Real-time communication

📅 Event Management
Add and manage events
View upcoming events
School-specific filtering

💼 Jobs & Placements
Alumni job postings
Job listings with company & location

🏫 School-Based System

Separate dashboards for:
SEAS (Engineering & Sciences)
ESLA (Liberal Arts)
PSB (Business School)

Each includes:
Alumni Directory
Events
Chat
Jobs


📂 File Uploads

Supported formats:
JPG / PNG
PDF / DOC

Used for:

Profile images
Event uploads
Contact forms

🔐 Authentication
Secure login system
Session handling
Role-based access

🧠 AI Capabilities
Context-aware conversations
Dynamic query processing
Structured responses
Real-time database fetching

🛠 Tech Stack
Frontend
React.js
Tailwind CSS
Vite
JavaScript

Backend
Flask / Node.js
REST APIs

Database
MySQL

AI Logic
Context-based chatbot engine
Dynamic filtering


📁 Project Structure
```
alumni-portal/
│
├── backend/
│   ├── routes/
│   ├── uploads/
│   ├── utils/
│   ├── app.py
│   ├── config.py
│   ├── models.py
│   ├── create_db.py
│   ├── seed.py
│   ├── requirements.txt
│   ├── Procfile
│   ├── .env
│   └── .env.example
│
├── src/
│   ├── components/
│   ├── pages/
│   │   └── About/
│   ├── assets/
│   ├── context/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── public/
├── index.html
├── package.json
└── vercel.json
```

⚙️ Installation & Setup

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
```
https://alumni-management-system-one.vercel.app/
```

📊 Core Modules
Alumni Directory
AI Chatbot
Events
Jobs
Chat System

🎯 Purpose

This project demonstrates:

Full-stack development
AI chatbot integration
Database management
Authentication systems
Real-time features


⭐ Show Your Support

If you like this project:

⭐ Star the repository
🍴 Fork it
🛠 Contribute