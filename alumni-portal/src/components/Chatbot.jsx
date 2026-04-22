import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, MapPin, Briefcase, IndianRupee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TypingDots = () => (
  <div className="flex space-x-1 items-center h-4 px-1">
    <div className="w-1.5 h-1.5 bg-university-green rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    <div className="w-1.5 h-1.5 bg-university-green rounded-full animate-bounce [animation-delay:-0.15s]"></div>
    <div className="w-1.5 h-1.5 bg-university-green rounded-full animate-bounce"></div>
  </div>
);

const Chatbot = ({ isOpen, onClose, onOpen }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { text: "Welcome to the SRM AP Alumni Portal Assistant! How can I help you today?", isBot: true, options: ['Find Alumni', 'Upcoming Events', 'Jobs and Placements'] }
  ]);
  const [inputText, setInputText] = useState('');
  const [context, setContext] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);
  
  // Track if user is manually scrolling
  const [userIsScrollingUp, setUserIsScrollingUp] = useState(false);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    
    // If we are not at the bottom (with a small 50px threshold), user scrolled up
    if (scrollHeight - scrollTop - clientHeight > 50) {
      setUserIsScrollingUp(true);
    } else {
      setUserIsScrollingUp(false);
    }
  };

  const scrollToBottom = (force = false) => {
    if (force || !userIsScrollingUp) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Only scroll if we aren't scrolled up or if we explicitly force it later
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (textOverride = null) => {
    const textToSend = textOverride !== null ? textOverride : inputText;
    if (!textToSend.trim() || isProcessing) return;
    
    setIsProcessing(true);
    setInputText('');
    
    // Force scroll and reset override when user actively sends a message
    setUserIsScrollingUp(false);
    
    // Add user message immediately
    setMessages(prev => {
      // Remove options from previous bot messages to keep chat clean
      const updated = prev.map(m => ({ ...m, options: undefined }));
      return [...updated, { text: textToSend, isBot: false }];
    });
    
    setIsTyping(true);
    setTimeout(() => scrollToBottom(true), 50); // Small delay to allow DOM render

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${API_URL}/api/chatbot/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend, context })
      });
      const response = await res.json();
      
      setIsTyping(false);
      
      if (response && response.text) {
        setMessages(prev => [...prev, { 
          text: response.text, 
          isBot: true, 
          options: response.options,
          data: response.data,
          type: response.type
        }]);
        
        if (response.context) {
          setContext(response.context);
        } else {
          setContext({});
        }
        setTimeout(() => scrollToBottom(true), 50);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Chatbot Error:", error);
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        text: "I'm having trouble connecting to the server. Please try again later.", 
        isBot: true,
        options: ["Main Menu"]
      }]);
      setContext({});
      setTimeout(() => scrollToBottom(true), 50);
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleChat = () => {
      if (isOpen) {
          onClose();
      } else {
          onOpen();
          setTimeout(() => scrollToBottom(true), 100);
      }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickAction = (action) => {
      // Quick actions from persistent sidebar or bottom bar
      if (action === 'Filter again' || action === 'Main Menu') {
          // Reset context if they click main menu
          if (action === 'Main Menu') {
              setContext({});
          }
          handleSendMessage(action);
          return;
      }
      handleSendMessage(action);
  };

  const formatSalary = (salary) => {
    if (!salary || isNaN(salary)) return '0';
    const lpa = salary / 100000;
    return lpa % 1 === 0 ? lpa.toString() : lpa.toFixed(1);
  };

  const renderDataCards = (type, data) => {
    if (!data || data.length === 0) return null;

    if (type === 'alumni_list') {
      return (
        <div className="flex flex-col gap-2 mt-2 w-full">
          {data.map((alumni, i) => (
            <div key={i} className="bg-theme-section border border-theme-border rounded-lg p-3 text-xs w-full shadow-sm">
              <div className="font-bold text-university-green dark:text-university-gold text-sm truncate">{alumni.fullName}</div>
              <div className="text-theme-text/80 font-medium text-[11px] mb-1">{alumni.school} {alumni.batchYear}</div>
              {alumni.companyName && (
                <div className="flex items-center gap-1.5 text-[11px] mt-1.5 text-theme-text">
                  <Briefcase size={12} className="text-university-gold shrink-0" />
                  <span className="truncate">{alumni.jobTitle ? `${alumni.jobTitle} at ` : ''}{alumni.companyName}</span>
                </div>
              )}
              {alumni.salary > 0 && (
                <div className="flex items-center gap-1.5 text-[11px] mt-1 font-semibold text-green-600 dark:text-green-400">
                  <IndianRupee size={12} className="shrink-0 text-university-gold" />
                  <span>₹{formatSalary(alumni.salary)} LPA</span>
                </div>
              )}
              {alumni.location && (
                <div className="flex items-center gap-1.5 text-[11px] mt-1 text-theme-text/70">
                  <MapPin size={12} className="shrink-0 text-university-gold" />
                  <span className="truncate">{alumni.location}</span>
                </div>
              )}
              <div className="mt-3 flex justify-end">
                <button 
                  onClick={() => navigate(`/alumni-directory?profileId=${alumni.id}`)}
                  className="bg-[#2F3E2F] text-[#FFFFFF] hover:bg-[#5A5F2C] text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer active:scale-95"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (type === 'event_list') {
      return (
        <div className="flex flex-col gap-2 mt-2 w-full">
          {data.map((evt, i) => (
            <div key={i} className="bg-theme-section border border-theme-border rounded-lg p-3 text-xs w-full shadow-sm">
              <div className="font-bold text-university-green dark:text-university-gold text-sm truncate">{evt.title}</div>
              <div className="text-theme-text/80 text-[11px] mt-1">{evt.dateTime || 'Date TBA'}</div>
              <div className="text-theme-text/70 text-[11px] truncate mt-1 flex items-center gap-1">
                 <MapPin size={10} className="text-university-gold shrink-0" />
                 {evt.location}
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (type === 'job_list') {
      return (
        <div className="flex flex-col gap-2 mt-2 w-full">
          {data.map((job, i) => (
            <div key={i} className="bg-theme-section border border-theme-border rounded-lg p-3 text-xs w-full shadow-sm">
              <div className="font-bold text-university-green dark:text-university-gold text-sm truncate">{job.jobTitle}</div>
              <div className="flex items-center gap-1.5 text-[11px] mt-1 text-theme-text">
                  <Briefcase size={12} className="text-university-gold shrink-0" />
                  <span className="truncate">{job.companyName}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] mt-1 text-theme-text/70">
                  <MapPin size={12} className="text-university-gold shrink-0" />
                  <span className="truncate">{job.location}</span>
              </div>
            </div>
          ))}
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="bg-theme-card rounded-2xl shadow-2xl border border-theme-border w-85 mb-4 flex flex-col h-[550px] transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)]">
          {/* Header */}
          <div className="bg-[#2F3E2F] rounded-t-2xl p-4 text-white flex justify-between items-center z-10 shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-[#C49A3A] rounded-full flex items-center justify-center shadow-inner">
                <MessageCircle size={20} className="text-[#2F3E2F]" />
              </div>
              <div>
                <span className="font-bold block text-sm tracking-wide">Alumni AI Assistant</span>
                <span className="text-[10px] text-[#C49A3A] font-bold uppercase tracking-widest flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span> Online
                </span>
              </div>
            </div>
            <button onClick={onClose} className="text-white/70 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg">
              <X size={20} />
            </button>
          </div>
          
          {/* Messages Area */}
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex-grow p-4 overflow-y-auto bg-[#F9FAFB] dark:bg-theme-bg flex flex-col space-y-4 custom-scrollbar"
          >
            {/* Disclaimer / Date marker */}
            <div className="text-center w-full pb-2">
                <span className="text-[10px] uppercase tracking-wider text-theme-muted font-semibold bg-theme-border/50 px-3 py-1 rounded-full">Secure Session</span>
            </div>

            {messages.map((msg, idx) => (
              <div key={idx} className={`flex flex-col w-full ${msg.isBot ? 'items-start' : 'items-end'}`}>
                <div className={`max-w-[85%] rounded-2xl p-3.5 text-sm leading-relaxed shadow-sm ${
                  msg.isBot 
                    ? 'bg-white dark:bg-theme-card border border-gray-200 dark:border-theme-border text-theme-text rounded-tl-sm' 
                    : 'bg-[#2F3E2F] text-white rounded-tr-sm'
                }`}>
                  {msg.text}
                </div>
                
                {msg.isBot && msg.data && renderDataCards(msg.type, msg.data)}

                {msg.isBot && msg.options && msg.options.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2 w-full pl-1">
                    {msg.options.map((opt, oIdx) => (
                      <button 
                        key={oIdx}
                        onClick={() => handleQuickAction(opt)}
                        disabled={isProcessing}
                        className="bg-white dark:bg-theme-section border border-[#5A5F2C]/30 text-[#5A5F2C] dark:text-[#C49A3A] hover:bg-[#5A5F2C] hover:text-white dark:hover:bg-[#C49A3A] dark:hover:text-[#2F3E2F] text-[11px] font-bold px-3 py-1.5 rounded-full transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start pl-1">
                <div className="bg-white dark:bg-theme-card border border-gray-200 dark:border-theme-border rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2 shadow-sm">
                  <span className="text-xs text-theme-text/70 font-medium mr-1">Assistant is typing</span>
                  <TypingDots />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} className="h-1" />
          </div>

          {/* Quick Actions Global Bar (Horizontal Scroll) */}
          <div className="px-3 py-2 bg-theme-section border-t border-theme-border overflow-x-auto hide-scrollbar flex gap-2 shrink-0">
             {['Find Alumni', 'Top Salary Alumni', 'Upcoming Events', 'Jobs and Placements', 'Register Help', 'Update Profile Help', 'Contact Info'].map((action, i) => (
                <button 
                  key={i}
                  onClick={() => handleQuickAction(action)}
                  disabled={isProcessing}
                  className="shrink-0 text-[10px] font-bold text-university-green dark:text-university-gold bg-university-green/10 dark:bg-university-gold/10 px-3 py-1.5 rounded-full hover:bg-university-green hover:text-white dark:hover:bg-university-gold dark:hover:text-university-green transition-colors disabled:opacity-50"
                >
                  {action}
                </button>
             ))}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white dark:bg-theme-card border-t border-gray-200 dark:border-theme-border flex gap-2 items-center z-20 shrink-0 rounded-b-2xl">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              className="flex-grow bg-[#F9FAFB] dark:bg-theme-section border border-theme-border rounded-xl px-4 py-3 text-sm text-theme-text focus:outline-none focus:border-[#C49A3A] focus:ring-1 focus:ring-[#C49A3A] transition-all"
              disabled={isProcessing}
            />
            <button 
              onClick={() => handleSendMessage()}
              disabled={isProcessing || !inputText.trim()}
              className="bg-[#C49A3A] hover:bg-[#5A5F2C] text-white disabled:bg-gray-300 dark:disabled:bg-theme-border disabled:text-gray-500 w-11 h-11 rounded-xl flex items-center justify-center transition-all shrink-0 cursor-pointer shadow-sm active:scale-95"
            >
              <Send size={18} className={inputText.trim() && !isProcessing ? 'translate-x-0.5' : ''} />
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button 
        onClick={toggleChat}
        className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-[0_10px_25px_rgba(47,62,47,0.4)] transition-all duration-300 hover:-translate-y-1 active:scale-95 group overflow-hidden cursor-pointer z-50 ${isOpen ? 'bg-white dark:bg-theme-card border border-theme-border text-[#2F3E2F] dark:text-[#C49A3A]' : 'bg-[#2F3E2F] hover:bg-[#1f2b1f] text-white'}`}
        aria-label="Toggle chatbot"
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        {isOpen ? <X size={28} className="transition-transform group-hover:rotate-90" /> : <MessageCircle size={32} className="group-hover:scale-110 transition-transform" />}
      </button>
    </div>
  );
};

export default Chatbot;
