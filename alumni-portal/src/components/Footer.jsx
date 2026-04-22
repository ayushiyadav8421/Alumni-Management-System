import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-theme-card text-theme-muted pt-16 pb-8 border-t border-theme-border transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <Link to="/" className="flex items-center space-x-3 mb-6 group">
                <img 
                  src="/images/srm_logo_official.png" 
                  alt="SRM University AP" 
                  className="h-12 w-auto transition-transform group-hover:scale-105"
                />
              </Link>
              <p className="text-sm leading-relaxed mb-6">
                Connecting graduates, building lifelong relationships, and fostering a global community of SRM AP alumni.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/SRMUniversityAP/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-theme-section flex items-center justify-center hover:bg-university-gold hover:text-white transition-colors border border-theme-border">
                  <Facebook size={18} />
                </a>
                <a href="https://x.com/SRMUAP" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-theme-section flex items-center justify-center hover:bg-university-gold hover:text-white transition-colors border border-theme-border">
                  <Twitter size={18} />
                </a>
                <a href="https://www.linkedin.com/school/srm-university-ap-andhra-pradesh/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-theme-section flex items-center justify-center hover:bg-university-gold hover:text-white transition-colors border border-theme-border">
                  <Linkedin size={18} />
                </a>
                <a href="https://www.instagram.com/srmuniversityap/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-theme-section flex items-center justify-center hover:bg-university-gold hover:text-white transition-colors border border-theme-border">
                  <Instagram size={18} />
                </a>
                <a href="https://www.youtube.com/@srmuniversity-ap5446" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-theme-section flex items-center justify-center hover:bg-university-gold hover:text-white transition-colors border border-theme-border">
                  <Youtube size={18} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-theme-text font-semibold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/about" className="hover:text-university-gold transition-colors">About Alumni Association</Link></li>
                <li><Link to="/alumni-directory" className="hover:text-university-gold transition-colors">Alumni Directory</Link></li>
                <li><Link to="/events" className="hover:text-university-gold transition-colors">Upcoming Events</Link></li>
                <li><Link to="/donate" className="hover:text-university-gold transition-colors">Giving Back</Link></li>
              </ul>
            </div>
 
            <div>
              <h4 className="text-theme-text font-semibold text-lg mb-6">Contact Us</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start space-x-3">
                  <MapPin size={18} className="text-university-gold shrink-0 mt-0.5" />
                  <span>SRM University AP, Mangalagiri Mandal, Neerukonda, Andhra Pradesh 522502</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone size={18} className="text-university-gold shrink-0" />
                  <span>+91-XXXXXXXXXX</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail size={18} className="text-university-gold shrink-0" />
                  <span>alumni@srmap.edu.in</span>
                </li>
              </ul>
            </div>
           
           <div>
             <h4 className="text-theme-text font-semibold text-lg mb-6">Get App</h4>
             <p className="text-sm mb-4">Download the SRM Alumni App to stay connected on the go.</p>
             <div className="flex flex-col space-y-3">
               <button className="bg-theme-section hover:bg-theme-border text-theme-text py-2 px-4 rounded flex items-center space-x-2 transition-colors border border-theme-border">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-6" />
               </button>
               <button className="bg-theme-section hover:bg-theme-border text-theme-text py-2 px-4 rounded flex items-center space-x-2 transition-colors border border-theme-border">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-6" />
               </button>
             </div>
           </div>
        </div>
        
        <div className="border-t border-theme-border pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <div className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} SRM University AP. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <Link to="/disclaimer" className="hover:text-university-gold transition-colors">Disclaimer</Link>
            <Link to="/terms" className="hover:text-university-gold transition-colors">Terms of Use</Link>
            <Link to="/privacy" className="hover:text-university-gold transition-colors">Privacy Policy</Link>
            <Link to="/directory" className="hover:text-university-gold transition-colors">Alumni Directory</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
