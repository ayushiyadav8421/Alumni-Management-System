import { Link } from 'react-router-dom';
import { User, Mail, Lock, Building, GraduationCap, Calendar, Upload } from 'lucide-react';
import { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    school: '',
    department: '',
    batchYear: '',
    companyName: '',
    jobTitle: '',
    location: '',
    linkedin: '',
    bio: '',
    profilePhoto: '',
    salary: '',
    role: 'alumni'
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    if(formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    setIsSubmitting(true);
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key !== 'confirmPassword' && key !== 'profilePhoto') {
        data.append(key, formData[key]);
      }
    });
    if (selectedFile) data.append('profilePhoto', selectedFile);
    data.append('role', formData.role);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/alumni`, {
        method: 'POST',
        body: data
      });
      
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 5000);
        // Reset form
        setFormData({
          fullName: '', email: '', password: '', confirmPassword: '',
          school: '', department: '', batchYear: '', companyName: '',
          jobTitle: '', location: '', linkedin: '', bio: '', profilePhoto: '', salary: ''
        });
        setSelectedFile(null);
        setPreviewUrl(null);
      } else {
        alert('Failed to register. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred. Please check the console.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-theme-bg">
        <div className="max-w-md w-full text-center premium-card p-10 bg-theme-card">
          <div className="w-20 h-20 bg-university-green rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="text-university-gold" size={40} />
          </div>
          <h2 className="text-3xl font-bold text-theme-text mb-4">Registration Successful!</h2>
          <p className="text-theme-muted mb-8 text-lg">Your profile has been added to the Alumni Directory. Welcome home!</p>
          <Link to="/alumni-directory" className="inline-block bg-university-green text-white px-8 py-3 rounded-md font-bold hover:bg-university-olive transition-colors">
            GO TO DIRECTORY
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-theme-bg py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-3xl w-full space-y-8 premium-card p-10 bg-theme-card">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-theme-text transition-colors">Join the Alumni Network</h2>
          <p className="mt-2 text-sm text-theme-muted transition-colors">
            Create your professional profile and connect with the community.
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-8">
            {/* Account Information Section */}
             <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                <div className="flex flex-col items-center space-y-4">
                   <div className="w-32 h-32 rounded-full border-4 border-university-gold/20 overflow-hidden bg-theme-section flex items-center justify-center relative group">
                      {previewUrl ? (
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <User className="text-theme-muted opacity-20" size={64} />
                      )}
                      <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                         <Upload className="text-white" size={24} />
                         <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                      </label>
                   </div>
                   <p className="text-[10px] uppercase font-bold text-theme-muted tracking-widest text-center">Profile Photo</p>
                </div>
                <div className="flex-1 w-full">
                  <h3 className="text-lg font-bold text-university-gold border-b border-theme-border pb-2 mb-4">Account Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                       <label className="block text-sm font-medium text-theme-text mb-1 transition-colors">Full Name</label>
                       <input name="fullName" type="text" required value={formData.fullName} onChange={handleChange} className="w-full text-sm border-theme-border bg-theme-section text-theme-text rounded-md border py-2 px-3 focus:ring-university-gold focus:border-university-gold transition-colors" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-theme-text mb-1 transition-colors">Email Address</label>
                      <input name="email" type="email" required value={formData.email} onChange={handleChange} className="w-full text-sm border-theme-border bg-theme-section text-theme-text rounded-md border py-2 px-3 focus:ring-university-gold focus:border-university-gold transition-colors" placeholder="Enter your email" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-theme-text mb-1 transition-colors">LinkedIn Profile URL</label>
                      <input name="linkedin" type="url" value={formData.linkedin} onChange={handleChange} className="w-full text-sm border-theme-border bg-theme-section text-theme-text rounded-md border py-2 px-3 focus:ring-university-gold focus:border-university-gold transition-colors" placeholder="https://linkedin.com/in/..." />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-theme-text mb-1 transition-colors">Password</label>
                      <input name="password" type="password" required value={formData.password} onChange={handleChange} className="w-full text-sm border-theme-border bg-theme-section text-theme-text rounded-md border py-2 px-3 focus:ring-university-gold focus:border-university-gold transition-colors" placeholder="Enter password" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-theme-text mb-1 transition-colors">Confirm Password</label>
                      <input name="confirmPassword" type="password" required value={formData.confirmPassword} onChange={handleChange} className="w-full text-sm border-theme-border bg-theme-section text-theme-text rounded-md border py-2 px-3 focus:ring-university-gold focus:border-university-gold transition-colors" placeholder="Confirm password" />
                    </div>
                  </div>
                </div>
             </div>

            {/* Academic Information Section */}
            <div>
              <h3 className="text-lg font-bold text-university-gold border-b border-theme-border pb-2 mb-4">Academic Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-theme-text mb-1 transition-colors">School</label>
                  <select name="school" required value={formData.school} onChange={handleChange} className="w-full text-sm border-theme-border bg-theme-section text-theme-text rounded-md border py-2 px-3 focus:ring-university-gold focus:border-university-gold transition-colors">
                    <option value="" disabled>Select School</option>
                    <option value="SEAS">SEAS</option>
                    <option value="ESLA">ESLA</option>
                    <option value="PSB">PSB</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-theme-text mb-1 transition-colors">Department</label>
                  <input name="department" type="text" required value={formData.department} onChange={handleChange} className="w-full text-sm border-theme-border bg-theme-section text-theme-text rounded-md border py-2 px-3 focus:ring-university-gold focus:border-university-gold transition-colors" placeholder="e.g. Computer Science" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-theme-text mb-1 transition-colors">Batch Year</label>
                  <input name="batchYear" type="number" required value={formData.batchYear} onChange={handleChange} className="w-full text-sm border-theme-border bg-theme-section text-theme-text rounded-md border py-2 px-3 focus:ring-university-gold focus:border-university-gold transition-colors" placeholder="2024" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-theme-text mb-1 transition-colors">Register as</label>
                  <select name="role" required value={formData.role} onChange={handleChange} className="w-full text-sm border-theme-border bg-theme-section text-theme-text rounded-md border py-2.5 px-3 focus:ring-university-gold focus:border-university-gold transition-colors font-bold">
                    <option value="student">Student</option>
                    <option value="alumni">Alumni</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Professional Information Section */}
            {formData.role === 'alumni' && (
              <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                <h3 className="text-lg font-bold text-university-gold border-b border-theme-border pb-2 mb-4">Professional Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-theme-text mb-1 transition-colors">Company Name</label>
                    <input name="companyName" type="text" required={formData.role === 'alumni'} value={formData.companyName} onChange={handleChange} className="w-full text-sm border-theme-border bg-theme-section text-theme-text rounded-md border py-2 px-3 focus:ring-university-gold focus:border-university-gold transition-colors" placeholder="e.g. Google, Microsoft" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-theme-text mb-1 transition-colors">Job Title</label>
                    <input name="jobTitle" type="text" required={formData.role === 'alumni'} value={formData.jobTitle} onChange={handleChange} className="w-full text-sm border-theme-border bg-theme-section text-theme-text rounded-md border py-2 px-3 focus:ring-university-gold focus:border-university-gold transition-colors" placeholder="e.g. Software Engineer" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-theme-text mb-1 transition-colors">Current Location</label>
                    <input name="location" type="text" required={formData.role === 'alumni'} value={formData.location} onChange={handleChange} className="w-full text-sm border-theme-border bg-theme-section text-theme-text rounded-md border py-2 px-3 focus:ring-university-gold focus:border-university-gold transition-colors" placeholder="e.g. Bangalore, London" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-theme-text mb-1 transition-colors">Current Salary (CTC)</label>
                    <input name="salary" type="number" required={formData.role === 'alumni'} value={formData.salary} onChange={handleChange} className="w-full text-sm border-theme-border bg-theme-section text-theme-text rounded-md border py-2 px-3 focus:ring-university-gold focus:border-university-gold transition-colors" placeholder="Enter your current salary (CTC)" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-theme-text mb-1 transition-colors">Short Bio</label>
                    <textarea name="bio" rows="3" value={formData.bio} onChange={handleChange} className="w-full text-sm border-theme-border bg-theme-section text-theme-text rounded-md border py-2 px-3 focus:ring-university-gold focus:border-university-gold transition-colors" placeholder="Tell us a bit about your professional journey..."></textarea>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-end pt-6 border-t border-theme-border">
            <button
               disabled={isSubmitting}
               type="submit"
               className={`px-8 py-3 rounded-md text-white font-bold transition-all shadow-md ${isSubmitting ? 'bg-theme-muted cursor-not-allowed' : 'bg-university-green hover:bg-university-olive hover:shadow-lg'}`}
            >
              {isSubmitting ? 'REGISTERING...' : 'REGISTER ACCOUNT'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
