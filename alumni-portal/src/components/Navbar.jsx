import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, ChevronDown, MessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import logo from '../assets/logo.png';

const Navbar = ({ onChatClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem('alumniUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };
    
    checkUser();
    // Listen for storage changes (for same-page updates)
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('alumniUser');
    setUser(null);
    window.location.href = '/';
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { 
      name: 'About Us', 
      path: '/about',
      dropdown: [
        { name: 'Message from Assistant Director', path: '/about/message-ad' },
        { name: 'Vision and Mission', path: '/about/vision-mission' },
        { name: 'Alumni Relations Core Committee', path: '/about/core-committee' },
        { name: 'Alumni Advisory Board', path: '/about/advisory-board' }
      ]
    },
    { name: 'Alumni Directory', path: '/alumni-directory' },
    { name: 'Events', path: '/events' },
    { name: 'Jobs & Placements', path: '/jobs' },
    { name: 'Donation', path: '/donate' },
    { name: 'Contact', path: '/contact' },
    { name: 'Chat', path: '/chat' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-theme-bg text-university-green sticky top-0 z-50 shadow-md transition-colors duration-300 border-b border-theme-border">
      {/* Remove top banner if any existed (per request) */}
      
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center group">
            <img 
              src={logo} 
              alt="SRM University AP" 
              className="h-14 w-auto transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-4">
            <div className="flex items-center">
              {navLinks.map((link) => (
                <div key={link.name} className="relative group">
                  {link.dropdown ? (
                    <div 
                      onMouseEnter={() => setAboutDropdownOpen(true)}
                      onMouseLeave={() => setAboutDropdownOpen(false)}
                      className="relative py-2"
                    >
                      <button
                        className={`px-2 xl:px-3 py-2 text-sm font-semibold flex items-center transition-colors ${
                          isActive(link.path) 
                            ? 'text-university-gold border-b-2 border-university-gold' 
                            : 'text-university-green dark:text-theme-text hover:text-university-gold'
                        }`}
                      >
                        {link.name} <ChevronDown size={14} className={`ml-1 transition-transform ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {aboutDropdownOpen && (
                        <div className="absolute left-0 mt-0 w-64 bg-theme-bg border border-theme-border rounded-md shadow-xl py-2 z-[60] animate-in fade-in slide-in-from-top-2 duration-200">
                          {link.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.path}
                              className="block px-4 py-2.5 text-sm text-theme-text hover:bg-university-green hover:text-white transition-colors"
                              onClick={() => setAboutDropdownOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                    ) : link.name === 'Chat' ? (
                      <Link
                        to="/alumni-chat"
                        className={`px-2 xl:px-3 py-2 text-sm font-semibold flex items-center transition-colors ${
                          isActive(link.path) 
                            ? 'text-university-gold border-b-2 border-university-gold' 
                            : 'text-university-green dark:text-theme-text hover:text-university-gold'
                        }`}
                      >
                        <MessageSquare size={16} className="mr-1.5" />
                        {link.name}
                      </Link>
                    ) : (
                      <Link
                        to={link.path}
                        className={`px-2 xl:px-3 py-2 text-sm font-semibold transition-colors ${
                          isActive(link.path) 
                            ? 'text-university-gold border-b-2 border-university-gold' 
                            : 'text-university-green dark:text-theme-text hover:text-university-gold'
                        }`}
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}
            </div>
            <div className="flex space-x-3 items-center border-l border-theme-border pl-4 xl:pl-6 ml-2">
               {user ? (
                 <>
                   <Link to="/alumni-directory" className="flex items-center space-x-2 text-sm font-bold text-university-green dark:text-theme-text hover:text-university-gold transition-colors">
                     <div className="w-8 h-8 rounded-full bg-university-gold flex items-center justify-center text-university-green border border-university-green/10 shadow-sm">
                        {user.fullName?.split(' ')[0]?.charAt(0).toUpperCase() || 'U'}
                     </div>
                     <span className="hidden xl:block uppercase tracking-tighter">{user.fullName?.split(' ')[0]}</span>
                   </Link>
                   <button 
                     onClick={handleLogout}
                     className="text-xs font-black text-red-600 hover:text-red-700 bg-red-50 dark:bg-red-900/10 px-3 py-1.5 rounded-full border border-red-100 dark:border-red-900/20 transition-all uppercase tracking-tight"
                   >
                     LOGOUT
                   </button>
                 </>
               ) : (
                 <>
                   <Link to="/register" className="text-sm font-bold text-university-green dark:text-theme-text hover:text-university-gold tracking-tighter">
                     REGISTER
                   </Link>
                   <span className="text-theme-muted">|</span>
                   <Link to="/login" className="flex items-center space-x-1 text-sm font-bold text-university-green dark:text-theme-text hover:text-university-gold tracking-tighter">
                     <User size={16} />
                     <span>LOGIN</span>
                   </Link>
                 </>
               )}
               
               <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 ml-2 text-university-green dark:text-theme-text hover:text-university-gold focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden bg-theme-bg border-t border-theme-border pb-4 px-4 overflow-y-auto max-h-[calc(100vh-80px)]">
          <div className="flex flex-col space-y-1 pt-4">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.dropdown ? (
                  <>
                    <button
                      onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                      className={`w-full text-left px-3 py-3 text-base font-semibold rounded-md flex justify-between items-center ${
                        isActive(link.path)
                          ? 'text-university-gold bg-university-green/10'
                          : 'text-university-green dark:text-theme-text'
                      }`}
                    >
                      {link.name} <ChevronDown size={20} className={`${aboutDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {aboutDropdownOpen && (
                      <div className="pl-4 bg-theme-section rounded-md mt-1 mb-2">
                        {link.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.path}
                            className="block px-3 py-2.5 text-sm text-theme-muted hover:text-university-gold"
                            onClick={() => {
                              setIsOpen(false);
                              setAboutDropdownOpen(false);
                            }}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : link.name === 'Chat' ? (
                  <Link
                    to="/alumni-chat"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-left px-3 py-3 text-base font-semibold rounded-md text-university-green dark:text-theme-text hover:bg-theme-section hover:text-university-gold flex items-center transition-colors"
                  >
                    <MessageSquare size={20} className="mr-3 text-university-gold" />
                    {link.name}
                  </Link>
                ) : (
                  <Link
                    to={link.path}
                    className={`block px-3 py-3 text-base font-semibold rounded-md ${
                      isActive(link.path)
                        ? 'text-university-gold bg-university-green/10'
                        : 'text-university-green dark:text-theme-text hover:bg-theme-section hover:text-university-gold'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="h-px bg-theme-border my-2 px-3"></div>
            {user ? (
              <div className="px-3 py-3">
                <p className="text-xs font-bold text-theme-muted uppercase mb-2 tracking-widest">Logged in as</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-university-green dark:text-theme-text">{user.fullName?.split(' ')[0]}</span>
                  <button 
                    onClick={handleLogout}
                    className="text-xs font-black text-red-600 border border-red-500/30 bg-red-500/5 px-3 py-1.5 rounded-md"
                  >
                    LOGOUT
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link to="/register" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-bold hover:bg-theme-section rounded-md text-university-gold">
                  Register
                </Link>
                <Link to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-bold hover:bg-theme-section rounded-md text-university-gold">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
