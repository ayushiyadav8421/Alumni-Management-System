import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SchoolDashboard from './pages/SchoolDashboard';
import ViceChancellorFullMessage from './pages/ViceChancellorFullMessage';

// About Sub-pages
import MessageAD from './pages/About/MessageAD';
import VisionMission from './pages/About/VisionMission';
import CoreCommittee from './pages/About/CoreCommittee';
import AdvisoryBoard from './pages/About/AdvisoryBoard';

// New Feature Pages
import Donation from './pages/Donation';
import Contact from './pages/Contact';

const Placeholder = ({ title }) => (
  <div className="container mx-auto p-12 text-center text-theme-muted bg-theme-bg min-h-[60vh] flex flex-col justify-center transition-colors">
    <h2 className="text-4xl font-bold mb-4 text-university-green dark:text-theme-text">{title}</h2>
    <div className="w-24 h-1 bg-university-gold mx-auto mb-6 rounded"></div>
    <p className="text-lg">This page is currently being updated for the new Alumni Portal experience.</p>
  </div>
);

import { useState } from 'react';
import AlumniDirectory from './pages/AlumniDirectory';
import Jobs from './pages/Jobs';
import Events from './pages/Events';
import AlumniChat from './pages/AlumniChat';
import SchoolPortal from './pages/SchoolPortal';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <Router>
      <Layout isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/alumni-directory" element={<AlumniDirectory />} />
          <Route path="/school/:schoolCode" element={<SchoolPortal />} />
          <Route path="/dashboard/:schoolId" element={<SchoolDashboard />} />
          <Route path="/message-from-vice-chancellor" element={<ViceChancellorFullMessage />} />
          
          {/* About Us Routes */}
          <Route path="/about" element={<VisionMission />} />
          <Route path="/about/message-ad" element={<MessageAD />} />
          <Route path="/about/vision-mission" element={<VisionMission />} />
          <Route path="/about/core-committee" element={<CoreCommittee />} />
          <Route path="/about/advisory-board" element={<AdvisoryBoard />} />
          
          {/* Main Feature Routes */}
          <Route path="/events" element={<Events />} />
          <Route path="/post-event" element={
            <ProtectedRoute requiredRole="alumni">
              <Events />
            </ProtectedRoute>
          } />
          
          <Route path="/donate" element={
            <ProtectedRoute requiredRole="alumni">
              <Donation />
            </ProtectedRoute>
          } />
          
          <Route path="/contact" element={<Contact />} />
          
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/add-job" element={
            <ProtectedRoute requiredRole="alumni">
              <Jobs />
            </ProtectedRoute>
          } />
          
          <Route path="/alumni-chat" element={<AlumniChat />} />
          <Route path="/mentorship" element={<Placeholder title="Mentorship Program" />} />

          {/* Fallback */}
          <Route path="*" element={<Placeholder title="404 - Page Not Found" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
