import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Send, User, Search, MessageSquare, Clock, Phone, Video, Info, ChevronDown } from 'lucide-react';
import { getAuthHeaders } from '../utils/auth';

const AlumniChat = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const schoolFilter = params.get('school');
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const getStoredUser = () => {
    try {
      const user = localStorage.getItem('alumniUser');
      return user ? JSON.parse(user) : null;
    } catch (e) {
      return null;
    }
  };

  const [currentUser, setCurrentUser] = useState(getStoredUser());
  const [alumni, setAlumni] = useState([]);
  const [selectedAlumnus, setSelectedAlumnus] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const prevMessagesLength = useRef(0);
  const initialLoadRef = useRef(true);
  const isSelfSending = useRef(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    // Re-check auth on mount and location changes
    setCurrentUser(getStoredUser());
    fetchAlumni();
  }, [location.pathname, schoolFilter]);

  useEffect(() => {
    // Reset initial load and message count when user switches conversation
    initialLoadRef.current = true;
    prevMessagesLength.current = 0;
    
    if (selectedAlumnus) {
      fetchMessages(selectedAlumnus.id);
    }

    const interval = setInterval(() => {
        if (selectedAlumnus) {
            fetchMessages(selectedAlumnus.id, true);
        }
    }, 3000); // Polling every 3s
    return () => clearInterval(interval);
  }, [selectedAlumnus]);

  const fetchAlumni = async () => {
    setLoading(true);
    try {
      const url = schoolFilter 
        ? `${API_URL}/api/alumni?school=${schoolFilter}&role=all`
        : `${API_URL}/api/alumni?role=all`;
      const response = await fetch(url);
      const data = await response.json();
      // Filter out current user from the list
      setAlumni(data.filter(a => String(a.id) !== String(currentUser?.id)));
    } catch (error) {
      console.error('Error fetching alumni:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (receiverId, isPoll = false) => {
    if (!currentUser?.id) return;
    try {
      const response = await fetch(`${API_URL}/api/messages?senderId=${currentUser.id}&receiverId=${receiverId}`);
      const data = await response.json();
      
      if (!Array.isArray(data)) {
        console.error('API returned invalid messages data:', data);
        return;
      }
      
      setMessages(prev => {
        // Safety check: ensure prev is also an array
        const safePrev = Array.isArray(prev) ? prev : [];
        if (data.length !== safePrev.length) {
          return data;
        }
        return safePrev;
      });
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedAlumnus || !currentUser.id) return;

    const messageData = {
      senderId: currentUser.id,
      receiverId: selectedAlumnus.id,
      content: newMessage,
      senderName: currentUser.fullName
    };

    try {
      isSelfSending.current = true;
      const response = await fetch(`${API_URL}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify(messageData)
      });
      if (response.ok) {
        const savedMsg = await response.json();
        setMessages(prev => [...prev, savedMsg]);
        setNewMessage('');
        // Force immediate scroll for sent message
        setTimeout(() => scrollToBottom(), 50);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      isSelfSending.current = false;
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const checkIfAtBottom = () => {
    const container = scrollContainerRef.current;
    if (!container) return false;
    const threshold = 150; // pixels from bottom
    const distanceToBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
    return distanceToBottom < threshold;
  };

  useEffect(() => {
    // Safety check for messages being an array
    const msgCount = Array.isArray(messages) ? messages.length : 0;
    
    if (msgCount > 0) {
      const isNewMessage = msgCount > prevMessagesLength.current;
      
      if (isNewMessage) {
        if (initialLoadRef.current || isSelfSending.current || checkIfAtBottom()) {
          // Auto-scroll logic
          scrollToBottom();
          initialLoadRef.current = false;
          setShowScrollButton(false);
        } else {
          // User is scrolled up, show indicator
          setShowScrollButton(true);
        }
      }
      prevMessagesLength.current = msgCount;
    }
  }, [messages]);

  const handleScroll = () => {
    if (checkIfAtBottom()) {
      setShowScrollButton(false);
    }
  };

  const filteredAlumni = alumni.filter(a => 
    a.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.school?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!currentUser?.id) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-theme-bg p-4 text-center">
        <div className="bg-university-green/10 p-6 rounded-full mb-6">
          <MessageSquare size={64} className="text-university-green" />
        </div>
        <h2 className="text-3xl font-bold text-theme-text mb-4">Please Login to Chat</h2>
        <p className="text-theme-muted mb-8 max-w-md">The Alumni Chat system is exclusive to registered members of the SRM University AP Alumni Portal.</p>
        <a href="/login" className="bg-university-green text-white font-black py-3 px-10 rounded-full hover:bg-university-olive transition-all shadow-lg">GO TO LOGIN</a>
      </div>
    );
  }

  return (
    <div className="bg-theme-bg min-h-screen py-8 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-7xl h-[calc(100vh-160px)]">
        <div className="flex bg-theme-card rounded-2xl shadow-2xl border border-theme-border overflow-hidden h-full transition-colors">
          
          {/* Sidebar / User List */}
          <div className="w-full md:w-80 border-r border-theme-border flex flex-col transition-colors">
            <div className="p-6 border-b border-theme-border transition-colors">
              <h2 className="text-xl font-bold text-theme-text mb-4">
                {schoolFilter ? `${schoolFilter} Alumni Chat` : 'All Alumni Messages'}
              </h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-muted" size={18} />
                <input 
                  type="text" 
                  placeholder="Search alumni..." 
                  className="w-full pl-10 pr-4 py-2 bg-theme-section border border-theme-border rounded-lg text-sm text-theme-text focus:outline-none focus:border-university-gold transition-colors"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex-grow overflow-y-auto custom-scrollbar">
              {loading ? (
                <div className="flex justify-center p-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-university-gold"></div></div>
              ) : filteredAlumni.length > 0 ? (
                filteredAlumni.map(alum => (
                  <div 
                    key={alum.id} 
                    onClick={() => setSelectedAlumnus(alum)}
                    className={`flex items-center p-4 cursor-pointer hover:bg-theme-section transition-colors border-l-4 ${selectedAlumnus?.id === alum.id ? 'bg-university-green/5 border-university-gold' : 'border-transparent'}`}
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-theme-section border border-theme-border mr-4 shrink-0 transition-colors">
                      <img 
                        src={alum.profile_image || alum.profilePhotoUrl ? `${API_URL}${alum.profile_image || alum.profilePhotoUrl}` : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2000&auto=format&fit=crop"} 
                        alt={alum.fullName} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="font-bold text-theme-text truncate">{alum.fullName}</h4>
                      <p className="text-xs text-theme-muted truncate">{alum.school} | {alum.jobTitle || 'Alumni'}</p>
                    </div>
                    <div className="ml-auto flex flex-col items-end">
                       <div className="w-2 h-2 rounded-full bg-green-500 mb-1"></div>
                       <span className="text-[10px] text-theme-muted">Online</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-theme-muted text-sm italic">No alumni found</div>
              )}
            </div>
          </div>

          {/* Chat Window */}
          <div className="flex-grow flex flex-col bg-theme-section transition-colors">
            {selectedAlumnus ? (
              <>
                {/* Header */}
                <div className="p-4 bg-theme-card border-b border-theme-border flex items-center justify-between transition-colors">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border border-theme-border">
                       <img 
                        src={selectedAlumnus.profile_image || selectedAlumnus.profilePhotoUrl ? `${API_URL}${selectedAlumnus.profile_image || selectedAlumnus.profilePhotoUrl}` : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2000&auto=format&fit=crop"} 
                        alt={selectedAlumnus.fullName} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-theme-text leading-tight">{selectedAlumnus.fullName}</h3>
                      <p className="text-xs text-green-500 font-medium">Active Now</p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                     <button className="p-2 text-theme-muted hover:text-university-gold transition-colors"><Phone size={20} /></button>
                     <button className="p-2 text-theme-muted hover:text-university-gold transition-colors"><Video size={20} /></button>
                     <button className="p-2 text-theme-muted hover:text-university-gold transition-colors"><Info size={20} /></button>
                  </div>
                </div>

                {/* Messages */}
                <div 
                  ref={scrollContainerRef}
                  onScroll={handleScroll}
                  className="flex-grow p-6 overflow-y-auto custom-scrollbar flex flex-col space-y-4 relative"
                >
                  {(!Array.isArray(messages) || messages.length === 0) ? (
                    <div className="flex-grow flex flex-col items-center justify-center text-theme-muted opacity-40">
                       <MessageSquare size={48} className="mb-2" />
                       <p className="text-sm">Start a conversation with {selectedAlumnus.fullName}</p>
                    </div>
                  ) : (
                    messages.map((msg, index) => {
                      if (!msg) return null;
                      return (
                        <div 
                          key={msg.id || index} 
                          className={`flex animate-in fade-in slide-in-from-bottom-2 duration-300 ${String(msg.senderId) === String(currentUser?.id) ? 'justify-end' : 'justify-start'}`}
                          style={{ animationDelay: `${Math.min(index * 50, 300)}ms` }}
                        >
                          <div className={`max-w-[70%] p-4 rounded-2xl shadow-sm ${
                            String(msg.senderId) === String(currentUser?.id) 
                              ? 'bg-university-green text-white rounded-tr-none' 
                              : 'bg-theme-card text-theme-text border border-theme-border rounded-tl-none'
                          }`}>
                            <p className="text-sm leading-relaxed">{msg.content || ''}</p>
                            <div className={`text-[10px] mt-2 flex items-center ${String(msg.senderId) === String(currentUser?.id) ? 'text-white/70' : 'text-theme-muted'}`}>
                               <Clock size={10} className="mr-1" />
                               {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* New Message Indicator */}
                {showScrollButton && (
                  <div className="relative z-20">
                    <button 
                      onClick={() => {
                        scrollToBottom();
                        setShowScrollButton(false);
                      }}
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-university-gold text-university-green px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 font-bold text-xs animate-bounce border-2 border-white dark:border-university-green hover:scale-105 transition-transform"
                    >
                      <span>New Message</span>
                      <ChevronDown size={14} />
                    </button>
                  </div>
                )}

                {/* Input Area */}
                <div className="p-4 bg-theme-card border-t border-theme-border transition-colors">
                  <form onSubmit={sendMessage} className="flex items-center space-x-3">
                    <input 
                      type="text" 
                      placeholder="Type your message..." 
                      className="flex-grow bg-theme-section border border-theme-border rounded-xl px-5 py-3 text-theme-text focus:outline-none focus:border-university-gold transition-colors"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button 
                      type="submit"
                      disabled={!newMessage.trim()}
                      className="bg-university-green text-white p-3.5 rounded-xl hover:bg-university-olive transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
                    >
                      <Send size={20} />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-grow flex flex-col items-center justify-center text-theme-muted p-10">
                <div className="w-20 h-20 bg-theme-section rounded-full flex items-center justify-center mb-6 border border-theme-border">
                   <MessageSquare size={40} className="text-university-gold opacity-50" />
                </div>
                <h3 className="text-2xl font-bold text-theme-text mb-2">Your Conversations</h3>
                <p className="max-w-xs text-center text-sm">Select an alumnus from the list on the left to start chatting and networking.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumniChat;
