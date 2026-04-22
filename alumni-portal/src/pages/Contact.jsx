import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Upload, ShieldCheck, AlertCircle } from 'lucide-react';
import ReCAPTCHA from "react-google-recaptcha";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    organisation: '',
    designation: '',
    department: '',
    officialEmail: '',
    personalEmail: '',
    mobileNumber: '',
    category: 'Alumni Inquiry',
    message: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  // Testing site key from Google documentation
  const RECAPTCHA_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaVerified) {
      alert('Please verify you are not a robot.');
      return;
    }
    setIsSubmitting(true);
    
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (selectedFile) data.append('attachment', selectedFile);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    try {
      const response = await fetch(`${API_URL}/api/contact-message`, {
        method: 'POST',
        body: data
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('An error occurred. Please check the console.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-theme-bg px-4 transition-colors">
        <div className="premium-card bg-theme-card p-12 text-center max-w-lg shadow-2xl animate-in zoom-in duration-300 border border-theme-border">
          <div className="w-24 h-24 bg-university-green rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg">
            <Send size={40} />
          </div>
          <h2 className="text-3xl font-bold text-theme-text mb-4 transition-colors">Message Sent Successfully!</h2>
          <p className="text-theme-muted mb-8 transition-colors">
            Thank you for reaching out to the SRM AP Alumni Office. We have received your message and will get back to you shortly.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                fullName: '', organisation: '', designation: '', department: '',
                officialEmail: '', personalEmail: '', mobileNumber: '',
                category: 'Alumni Inquiry', message: ''
              });
              setSelectedFile(null);
            }}
            className="bg-university-green text-white font-bold py-3 px-10 rounded-full hover:bg-university-olive transition-all shadow-md hover:shadow-xl"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-theme-bg transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-university-green dark:text-theme-text mb-4 inline-block relative border-b-4 border-university-gold pb-2 transition-colors">
            Contact Us
          </h1>
          <p className="text-lg text-theme-muted max-w-2xl mx-auto mt-4 transition-colors">
            Have questions or want to collaborate? Reach out to the Alumni Relations Office.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="premium-card !bg-white p-8 shadow-xl border-l-8 border-university-green transform-none hover:transform-none">
              <h3 className="text-2xl font-bold mb-8 text-university-green">Get in Touch</h3>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-university-green/10 rounded-xl text-university-green font-bold"><MapPin size={24} /></div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 !text-black">Campus Address</h4>
                    <p className="!text-black text-sm leading-relaxed font-medium">
                      SRM University AP, Mangalagiri Mandal, Neerukonda, Andhra Pradesh - 522502
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-university-green/10 rounded-xl text-university-green font-bold"><Mail size={24} /></div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 !text-black">Official Email</h4>
                    <p className="!text-black text-sm leading-relaxed font-bold">alumni@srmap.edu.in</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-university-green/10 rounded-xl text-university-green font-bold"><Phone size={24} /></div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 !text-black">Mobile Number</h4>
                    <p className="!text-black text-sm leading-relaxed font-bold">+91-XXXXX-XXXXX</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-12 border-t border-gray-100">
                <h4 className="font-bold mb-4 text-university-green">Follow Our Community</h4>
                <p className="text-gray-600 text-xs mb-8 font-semibold">Stay updated with the latest alumni news and event announcements on our social platforms.</p>
                <div className="flex space-x-3">
                  {['FB', 'TW', 'LN', 'IG'].map(s => (
                    <div key={s} className="w-10 h-10 rounded-full bg-university-green/10 flex items-center justify-center font-bold text-xs text-university-green hover:bg-university-gold hover:text-white transition-all cursor-pointer border border-university-green/20 shadow-sm">{s}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="premium-card bg-theme-card p-8 md:p-12 shadow-2xl border border-theme-border">
              <h3 className="text-2xl font-bold text-theme-text mb-10 pb-4 border-b border-theme-border transition-colors flex items-center">
                <Send className="mr-3 text-university-green dark:text-university-gold" size={24} /> Submit Your Inquiry
              </h3>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-theme-text transition-colors">Full Name <span className="text-red-500">*</span></label>
                    <input
                      type="text" required
                      className="w-full bg-theme-section border border-theme-border rounded-lg px-4 py-3 focus:outline-none focus:border-university-gold text-theme-text transition-colors"
                      placeholder="e.g. John Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-theme-text transition-colors">Organisation</label>
                    <input
                      type="text"
                      className="w-full bg-theme-section border border-theme-border rounded-lg px-4 py-3 focus:outline-none focus:border-university-gold text-theme-text transition-colors"
                      placeholder="Current Company/Org"
                      value={formData.organisation}
                      onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-theme-text transition-colors">Designation</label>
                    <input
                      type="text"
                      className="w-full bg-theme-section border border-theme-border rounded-lg px-4 py-3 focus:outline-none focus:border-university-gold text-theme-text transition-colors"
                      placeholder="e.g. Software Engineer"
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-theme-text transition-colors">Department</label>
                    <input
                      type="text"
                      className="w-full bg-theme-section border border-theme-border rounded-lg px-4 py-3 focus:outline-none focus:border-university-gold text-theme-text transition-colors"
                      placeholder="e.g. Engineering / HR"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-theme-text transition-colors">Official Email <span className="text-red-500">*</span></label>
                    <input
                      type="email" required
                      className="w-full bg-theme-section border border-theme-border rounded-lg px-4 py-3 focus:outline-none focus:border-university-gold text-theme-text transition-colors"
                      placeholder="work@org.com"
                      value={formData.officialEmail}
                      onChange={(e) => setFormData({ ...formData, officialEmail: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-theme-text transition-colors">Personal Email (Optional)</label>
                    <input
                      type="email"
                      className="w-full bg-theme-section border border-theme-border rounded-lg px-4 py-3 focus:outline-none focus:border-university-gold text-theme-text transition-colors"
                      placeholder="personal@mail.com"
                      value={formData.personalEmail}
                      onChange={(e) => setFormData({ ...formData, personalEmail: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-theme-text transition-colors">Mobile Number <span className="text-red-500">*</span></label>
                    <input
                      type="tel" required
                      className="w-full bg-theme-section border border-theme-border rounded-lg px-4 py-3 focus:outline-none focus:border-university-gold text-theme-text transition-colors"
                      placeholder="+91-XXXXX-XXXXX"
                      value={formData.mobileNumber}
                      onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-theme-text transition-colors">Category</label>
                    <select
                      className="w-full bg-theme-section border border-theme-border rounded-lg px-4 py-3 focus:outline-none focus:border-university-gold text-theme-text transition-colors"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option>Alumni Inquiry</option>
                      <option>Job Posting</option>
                      <option>Mentorship Program</option>
                      <option>Event Participation</option>
                      <option>Technical Support</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-theme-text transition-colors">Message <span className="text-red-500">*</span></label>
                  <textarea
                    required rows="5"
                    className="w-full bg-theme-section border border-theme-border rounded-lg px-4 py-3 focus:outline-none focus:border-university-gold text-theme-text transition-colors"
                    placeholder="Tell us how we can help you..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-theme-text transition-colors flex items-center">
                      <Upload size={16} className="mr-2" /> File Upload (Optional)
                    </label>
                    <label className="border-2 border-dashed border-theme-border rounded-lg p-6 text-center hover:border-university-gold transition-colors cursor-pointer bg-theme-section block group">
                      <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.ppt,.pptx" />
                      {selectedFile ? (
                        <div className="flex flex-col items-center">
                           <ShieldCheck className="text-university-green mb-2" size={32} />
                           <p className="text-sm font-bold text-theme-text">{selectedFile.name}</p>
                           <p className="text-[10px] text-theme-muted mt-1 uppercase">File selected - Click to change</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <Upload className="text-theme-muted mb-2 group-hover:text-university-gold transition-colors" size={32} />
                          <p className="text-xs text-theme-muted font-medium">Click to upload documents (PDF, JPG, PNG, DOC, PPT)</p>
                        </div>
                      )}
                    </label>
                  </div>
                  <div className="space-y-3 flex justify-center md:justify-end">
                    <ReCAPTCHA
                      sitekey={RECAPTCHA_SITE_KEY}
                      onChange={(value) => setCaptchaVerified(!!value)}
                      theme="light"
                    />
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    disabled={isSubmitting || !captchaVerified}
                    type="submit"
                    className={`w-full text-white font-extrabold py-4 rounded-lg transition-all shadow-lg transform hover:-translate-y-1 active:scale-95 flex items-center justify-center space-x-2 ${isSubmitting || !captchaVerified ? 'bg-theme-muted cursor-not-allowed grayscale' : 'bg-university-green hover:bg-university-olive hover:shadow-xl'}`}
                  >
                    {isSubmitting ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>SUBMIT MESSAGE</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
