import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar, MapPin, Clock, Plus, Upload, X, ChevronRight, User, GraduationCap } from 'lucide-react';
import { getAuthHeaders } from '../utils/auth';

const Events = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const schoolFilter = params.get('school');
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    type: 'webinar',
    dateTime: '',
    location: '',
    description: '',
    school: schoolFilter || 'SEAS',
    organizer: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, [schoolFilter]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const url = schoolFilter 
        ? `${API_URL}/api/events?school=${schoolFilter}`
        : `${API_URL}/api/events`;
      const response = await fetch(url);
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (selectedFile) data.append('eventImage', selectedFile);

    try {
      const response = await fetch(`${API_URL}/api/events`, {
        method: 'POST',
        headers: { ...getAuthHeaders() },
        body: data
      });
      if (response.ok) {
        setShowForm(false);
        setFormData({ title: '', type: 'webinar', dateTime: '', location: '', description: '' });
        setSelectedFile(null);
        setPreviewUrl(null);
        fetchEvents();
      }
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const userStr = localStorage.getItem('alumniUser');
  const user = userStr ? JSON.parse(userStr) : null;
  const isAlumni = user?.role?.toLowerCase() === 'alumni';

  return (
    <div className="py-16 bg-theme-bg min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-university-green dark:text-theme-text mb-4 inline-block relative border-b-4 border-university-gold pb-2 transition-colors">
              Upcoming Events
            </h1>
            <p className="text-lg text-theme-muted mt-4 transition-colors">
              Stay connected and grow with our alumni community events.
            </p>
          </div>
          {isAlumni && (
            <button 
              onClick={() => setShowForm(!showForm)}
              className="mt-6 md:mt-0 flex items-center space-x-2 bg-university-green text-white px-6 py-3 rounded-full hover:bg-university-olive transition-all shadow-lg hover:shadow-xl font-bold"
            >
              {showForm ? <X size={20} /> : <Plus size={20} />}
              <span>{showForm ? 'Cancel' : 'Add Event'}</span>
            </button>
          )}
        </div>

        {showForm && (
          <div className="premium-card bg-theme-card p-8 md:p-12 shadow-2xl border border-theme-border mb-16 animate-in slide-in-from-top duration-300">
            <h3 className="text-2xl font-bold text-theme-text mb-8 border-b border-theme-border pb-4">Create New Event</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-theme-text transition-colors">Event Title</label>
                  <input 
                    type="text" required
                    className="w-full bg-theme-section border border-theme-border rounded-lg px-4 py-3 focus:outline-none focus:border-university-gold text-theme-text transition-colors"
                    placeholder="e.g. Annual Alumni Meet 2026"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-theme-text transition-colors">Event Type</label>
                    <select 
                      className="w-full bg-theme-section border border-theme-border rounded-lg px-4 py-2.5 focus:outline-none focus:border-university-gold text-theme-text transition-colors"
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                    >
                      <option value="webinar">Webinar</option>
                      <option value="reunion">Reunion</option>
                      <option value="workshop">Workshop</option>
                      <option value="campus event">Campus Event</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-theme-text transition-colors">School</label>
                    <select 
                      className="w-full bg-theme-section border border-theme-border rounded-lg px-4 py-2.5 focus:outline-none focus:border-university-gold text-theme-text transition-colors"
                      value={formData.school}
                      onChange={(e) => setFormData({...formData, school: e.target.value})}
                    >
                      <option value="SEAS">SEAS</option>
                      <option value="ESLA">ESLA</option>
                      <option value="PSB">PSB</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-theme-text transition-colors">Date & Time</label>
                    <input 
                      type="datetime-local" required
                      className="w-full bg-theme-section border border-theme-border rounded-lg px-4 py-2 focus:outline-none focus:border-university-gold text-theme-text transition-colors"
                      value={formData.dateTime}
                      onChange={(e) => setFormData({...formData, dateTime: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-theme-text transition-colors">Organizer</label>
                    <input 
                      type="text" required
                      className="w-full bg-theme-section border border-theme-border rounded-lg px-4 py-2 focus:outline-none focus:border-university-gold text-theme-text transition-colors"
                      placeholder="e.g. Alumni Office"
                      value={formData.organizer}
                      onChange={(e) => setFormData({...formData, organizer: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-theme-text transition-colors">Location / Platform</label>
                  <input 
                    type="text" required
                    className="w-full bg-theme-section border border-theme-border rounded-lg px-4 py-3 focus:outline-none focus:border-university-gold text-theme-text transition-colors"
                    placeholder="e.g. SRM AP Campus / Zoom"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-theme-text transition-colors">Description</label>
                  <textarea 
                    required rows="4"
                    className="w-full bg-theme-section border border-theme-border rounded-lg px-4 py-3 focus:outline-none focus:border-university-gold text-theme-text transition-colors"
                    placeholder="Brief details about the event..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  ></textarea>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-theme-text transition-colors">Event Banner</label>
                  <div className="flex items-center space-x-4">
                    <label className="flex-1 border-2 border-dashed border-theme-border rounded-lg p-6 text-center hover:border-university-gold transition-colors cursor-pointer bg-theme-section">
                      <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                      {previewUrl ? (
                        <img src={previewUrl} alt="Preview" className="h-32 mx-auto rounded object-cover" />
                      ) : (
                        <div className="flex flex-col items-center">
                          <Upload className="text-theme-muted mb-2" size={32} />
                          <p className="text-xs text-theme-muted font-medium">Click to upload banner image</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 pt-4">
                <button type="submit" className="w-full bg-university-green text-white font-black py-4 rounded-lg hover:bg-university-olive transition-all shadow-xl">
                  PUBLISH EVENT
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center p-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-university-green"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {events.map((event) => (
              <div key={event.id} className="premium-card bg-theme-card overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-theme-border group">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={event.imageUrl ? `${API_URL}${event.imageUrl}` : "https://images.unsplash.com/photo-1540575861501-7ad060e39fe1?q=80&w=2070&auto=format&fit=crop"} 
                    alt={event.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-university-gold text-university-green text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                      {event.type}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex-grow">
                  <h3 className="text-2xl font-bold text-theme-text mb-4 group-hover:text-university-green transition-colors line-clamp-2 leading-tight">
                    {event.title}
                  </h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-theme-muted text-sm transition-colors">
                      <Calendar size={16} className="mr-3 text-university-gold" />
                      {new Date(event.dateTime).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <div className="flex items-center text-theme-muted text-sm transition-colors">
                      <Clock size={16} className="mr-3 text-university-gold" />
                      {new Date(event.dateTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className="flex items-center text-theme-muted text-sm transition-colors">
                      <MapPin size={16} className="mr-3 text-university-gold" />
                      {event.location}
                    </div>
                  </div>
                  <p className="text-theme-muted text-sm line-clamp-3 mb-8 leading-relaxed">
                    {event.description}
                  </p>
                  <button 
                    onClick={() => setSelectedEvent(event)}
                    className="flex items-center text-university-green dark:text-university-gold font-bold text-sm group-hover:space-x-2 transition-all"
                  >
                    <span>View Details</span>
                    <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!loading && events.length === 0 && (
          <div className="text-center py-20 bg-theme-section rounded-3xl border border-dashed border-theme-border">
            <Calendar className="mx-auto text-theme-muted mb-4 opacity-20" size={64} />
            <h3 className="text-2xl font-bold text-theme-text opacity-40">No upcoming events found</h3>
            <p className="text-theme-muted mt-2">Check back soon for latest updates!</p>
          </div>
        )}
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-theme-card w-full max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in duration-200 flex flex-col">
            <div className="relative h-64 md:h-80 shrink-0">
              <img 
                src={selectedEvent.imageUrl ? `${API_URL}${selectedEvent.imageUrl}` : "https://images.unsplash.com/photo-1540575861501-7ad060e39fe1?q=80&w=2070&auto=format&fit=crop"} 
                alt={selectedEvent.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                <span className="bg-university-gold text-university-green text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest w-fit mb-3">
                  {selectedEvent.type}
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                  {selectedEvent.title}
                </h2>
              </div>
              <button 
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 bg-black/40 text-white hover:bg-university-gold hover:text-university-green p-2 rounded-full transition-all z-20"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 border-b border-theme-border pb-8 transition-colors">
                <div className="flex items-center">
                  <div className="p-3 bg-university-green/10 rounded-xl text-university-green font-bold mr-4"><Calendar size={24} /></div>
                  <div>
                    <h4 className="text-xs font-bold text-theme-muted uppercase tracking-widest mb-1">Date</h4>
                    <p className="font-bold text-theme-text">{new Date(selectedEvent.dateTime).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="p-3 bg-university-green/10 rounded-xl text-university-green font-bold mr-4"><MapPin size={24} /></div>
                  <div>
                    <h4 className="text-xs font-bold text-theme-muted uppercase tracking-widest mb-1">Location</h4>
                    <p className="font-bold text-theme-text">{selectedEvent.location}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="p-3 bg-university-green/10 rounded-xl text-university-green font-bold mr-4"><User size={24} /></div>
                  <div>
                    <h4 className="text-xs font-bold text-theme-muted uppercase tracking-widest mb-1">Organizer</h4>
                    <p className="font-bold text-theme-text">{selectedEvent.organizer || "Alumni Relations Office"}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                   <h3 className="text-xl font-bold text-theme-text mb-3 flex items-center">
                      <GraduationCap className="mr-2 text-university-gold" size={20} />
                      School Affiliation
                   </h3>
                   <div className="inline-block px-4 py-2 bg-theme-section rounded-lg border border-theme-border text-university-green font-black dark:text-university-gold">
                      {selectedEvent.school || "SEAS"}
                   </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-theme-text mb-3">About the Event</h3>
                  <div className="text-theme-muted leading-relaxed whitespace-pre-line text-lg">
                    {selectedEvent.description}
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-theme-border flex justify-between items-center transition-colors">
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="px-8 py-3 bg-theme-section text-theme-text hover:bg-theme-border rounded-lg transition-colors font-bold"
                >
                  Close Details
                </button>
                <button className="px-10 py-3 bg-university-green text-white rounded-lg hover:bg-university-olive transition-all font-black shadow-lg">
                  REGISTER NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
