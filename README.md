🎓 SRM AP Alumni Portal with AI Assistant

An intelligent Alumni Management System with an AI-powered chatbot that helps users search alumni, explore events, view jobs, and connect with alumni in real time.

The chatbot behaves like an AI assistant and fetches live data from the backend database to answer user queries conversationally.

🚀 Key Features
👩‍🎓 Alumni Directory
Add alumni details
Edit profile functionality
Upload profile photo
View alumni profiles
Salary displayed in LPA format
Smart filtering:
School (SEAS, ESLA, PSB)
Batch year
Company
Location
Salary range
School-wise alumni directory

🤖 AI Chatbot Assistant
Works like ChatGPT-style assistant
Answers questions using website database
Conversational search experience
Ask follow-up questions
Shows alumni inside chat
Shows events inside chat
Includes View Profile button
Does NOT unnecessarily redirect pages

Example queries:

Find alumni from SEAS 2021
Show top salary alumni
Show upcoming events
Jobs available
How to register
Contact information

💬 Alumni Chat System
Alumni can chat with each other
User-based messaging
Smooth chat interface
Smart scrolling behaviour

📅 Event Management
Add events
View upcoming events
Event details page
School-specific events

💼 Jobs & Placements
Alumni can post jobs
View job listings
Company details
Location details

🏫 School-Based System

Separate dashboards for:

SEAS (Engineering & Sciences)
ESLA (Liberal Arts)
PSB (Business School)

Each school contains:

Alumni Directory
Events
Chat
Jobs

📂 File Upload Features
Profile image upload
Document upload in contact form
Event image upload

Supported formats:

JPG
PNG
PDF
DOC

🔐 Authentication
Login system
Secure session handling
Profile-based access

🧠 AI Capabilities

Chatbot intelligently understands user queries and fetches real data from backend database.

Features:

Context aware conversation
Follow-up questions
Dynamic filtering
Structured responses
Real-time data retrieval

🛠 Tech Stack
Frontend
React.js
Tailwind CSS
JavaScript
Vite
Lucide Icons
Backend
Flask / Node.js
REST API
Database
MySQL
AI Logic
Context-based chatbot logic
Dynamic query processing

📁 Project Structure
alumni-portal/
│
├── backend/
│   ├── app.py
│   ├── routes/
│   ├── models/
│   └── uploads/
│
├── src/
│   ├── components/
│   │   ├── Chatbot.jsx
│   │   ├── Navbar.jsx
│   │   ├── AlumniCard.jsx
│   │   └── EventCard.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── AlumniDirectory.jsx
│   │   ├── Events.jsx
│   │   ├── Jobs.jsx
│   │   ├── Register.jsx
│   │   ├── Contact.jsx
│   │   └── Chat.jsx
│
├── public/
├── package.json
└── README.md

⚙️ Installation
Clone repository
git clone https://github.com/muskan-512/Alumni-Management-System.git
cd Alumni-Management-System

Install frontend dependencies
npm install
npm run dev

Run backend
cd backend
pip install -r requirements.txt
python app.py

Open website
http://localhost:5173

📊 Main Functional Modules
Alumni Directory

Search and filter alumni easily.

AI Chatbot

Smart assistant to guide users.

Events

Browse upcoming events.

Jobs

Explore job opportunities.

Chat

Connect with alumni.

🎯 Future Improvements
Voice AI chatbot
Mobile responsive app
Email notifications
Alumni networking system
Recommendation engine

👨‍💻 Developed for Learning & Portfolio

This project demonstrates:

full stack development
AI-based chatbot integration
database handling
authentication system
real-time feature
