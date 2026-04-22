import Navbar from './Navbar';
import Footer from './Footer';
import Chatbot from './Chatbot';

const Layout = ({ children, isChatOpen, setIsChatOpen }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      <Navbar onChatClick={() => setIsChatOpen(true)} />
      <main className="flex-grow">
        {children}
      </main>
      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} onOpen={() => setIsChatOpen(true)} />
      <Footer />
    </div>
  );
};

export default Layout;
