import React, { useState } from 'react';
import { Heart, Wallet, Gift, ShieldCheck } from 'lucide-react';

const Donation = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    amount: '',
    purpose: 'Scholarship support',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // API Call will go here
    console.log('Donation submitted:', formData);
    
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    
    // Simulate backend call
    try {
      const response = await fetch(`${API_URL}/api/donations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSubmitted(true);
      } else {
        // Fallback for demo if backend isn't running
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting donation:', error);
      setSubmitted(true); // Still show success for demo purposes
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-theme-bg px-4 transition-colors">
        <div className="premium-card bg-theme-card p-12 text-center max-w-lg shadow-2xl animate-in zoom-in duration-300">
          <div className="w-24 h-24 bg-university-green rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg">
            <ShieldCheck size={48} />
          </div>
          <h2 className="text-3xl font-bold text-theme-text mb-4 transition-colors">Thank You for Your Support!</h2>
          <p className="text-theme-muted mb-8 transition-colors">
            Your generous contribution will make a significant impact on our students' lives and the university's growth. A receipt has been sent to your email.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="bg-university-green text-white font-bold py-3 px-10 rounded-full hover:bg-university-olive transition-all shadow-md hover:shadow-xl"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-theme-bg transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-university-green dark:text-theme-text mb-4 inline-block relative border-b-4 border-university-gold pb-2 transition-colors">
            Support Our Students
          </h1>
          <p className="text-lg text-theme-muted max-w-2xl mx-auto mt-4 transition-colors">
            Your contribution helps us provide quality education to deserving students who face financial challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Info Side */}
          <div className="space-y-8">
            <div className="premium-card bg-university-green text-white p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Heart className="mr-3 text-university-gold fill-university-gold" /> Why Donate?
              </h3>
              <div className="space-y-6">
                {[
                  { title: "Student Scholarship", icon: <Gift size={24} />, desc: "Support students who cannot afford tuition fees." },
                  { title: "Financial Aid", icon: <Wallet size={24} />, desc: "Help students with emergency funds and living expenses." },
                  { title: "Research Support", icon: <Gift size={24} />, desc: "Fuel innovation by funding student and faculty research." },
                  { title: "Campus Development", icon: <Gift size={24} />, desc: "Contribute to building world-class infrastructure." }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-4">
                    <div className="p-2 bg-white/10 rounded-lg text-university-gold">{item.icon}</div>
                    <div>
                      <h4 className="font-bold text-lg">{item.title}</h4>
                      <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="premium-card bg-theme-section p-8 border border-theme-border transition-colors">
              <h3 className="text-xl font-bold text-theme-text mb-4 transition-colors">Secure Payment</h3>
              <p className="text-sm text-theme-muted transition-colors">
                All donations are processed through encrypted channels. For international wire transfers, please contact our financial office directly.
              </p>
            </div>
          </div>

          {/* Form Side */}
          <div className="premium-card bg-theme-card p-8 md:p-10 shadow-2xl border border-theme-border">
            <h3 className="text-2xl font-bold text-theme-text mb-8 transition-colors">Donation Form</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-theme-text mb-2 transition-colors">Full Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Enter your full name"
                    className="w-full bg-theme-section border border-theme-border rounded-lg px-4 py-3 text-theme-text focus:outline-none focus:border-university-gold transition-all"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-theme-text mb-2 transition-colors">Email Address</label>
                  <input 
                    type="email" 
                    required
                    placeholder="email@example.com"
                    className="w-full bg-theme-section border border-theme-border rounded-lg px-4 py-3 text-theme-text focus:outline-none focus:border-university-gold transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-theme-text mb-2 transition-colors">Donation Amount ($)</label>
                  <input 
                    type="number" 
                    required
                    min="1"
                    placeholder="Enter amount"
                    className="w-full bg-theme-section border border-theme-border rounded-lg px-4 py-3 text-theme-text focus:outline-none focus:border-university-gold transition-all font-bold text-university-green dark:text-university-gold"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-theme-text mb-2 transition-colors">Purpose of Donation</label>
                  <select 
                    className="w-full bg-theme-section border border-theme-border rounded-lg px-4 py-3 text-theme-text focus:outline-none focus:border-university-gold transition-all"
                    value={formData.purpose}
                    onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                  >
                    <option>Scholarship support</option>
                    <option>Student emergency fund</option>
                    <option>Research support</option>
                    <option>Campus development</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-theme-text mb-2 transition-colors">Message (Optional)</label>
                <textarea 
                  rows="4"
                  placeholder="Share a word of encouragement..."
                  className="w-full bg-theme-section border border-theme-border rounded-lg px-4 py-3 text-theme-text focus:outline-none focus:border-university-gold transition-all"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              <div className="pt-4">
                <p className="text-xs text-theme-muted mb-4 transition-colors italic">
                  * Payment integration placeholder. Clicking contribute will simulate a successful transaction.
                </p>
                <button 
                  type="submit"
                  className="w-full bg-university-gold text-university-green font-extrabold py-4 rounded-lg hover:bg-yellow-500 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  CONTRIBUTE NOW
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donation;
