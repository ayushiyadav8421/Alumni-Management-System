import { useState, useEffect } from 'react';
import { Briefcase, MapPin, Building, Globe, Plus, X } from 'lucide-react';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newJob, setNewJob] = useState({
    jobTitle: '',
    companyName: '',
    jobType: 'Full-time',
    location: '',
    jobDescription: '',
    applyLink: '',
    postedBy: 'Alumni Network'
  });

  useEffect(() => {
    fetch(`${API_URL}/api/jobs`)
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setNewJob({ ...newJob, [e.target.name]: e.target.value });
  };

const handlePostJob = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {

    // get logged in user token
  const token = localStorage.getItem("alumniToken");
    const response = await fetch(`${API_URL}/api/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`   // IMPORTANT
      },
      body: JSON.stringify(newJob)
    });

    if (!response.ok) {
      throw new Error("Failed to post job");
    }

    const data = await response.json();

    setJobs(prev => [data.job, ...prev]);

    setIsFormOpen(false);

    setNewJob({
      jobTitle: "",
      companyName: "",
      jobType: "Full-time",
      location: "",
      jobDescription: "",
      applyLink: "",
      postedBy: "Alumni Network"
    });

  } catch (err) {
    console.error(err);
    alert("Job posting failed. Please login again.");
  } finally {
    setIsSubmitting(false);
  }
};

  const userStr = localStorage.getItem('alumniUser');
  const user = userStr ? JSON.parse(userStr) : null;
  const isAlumni = user?.role?.toLowerCase() === 'alumni';

  return (
    <div className="bg-theme-bg min-h-screen py-10 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-theme-text mb-2 transition-colors">Jobs & Placements</h1>
            <p className="text-theme-muted transition-colors">Exclusive opportunities posted by our alumni community.</p>
          </div>
          {isAlumni && (
            <button 
              onClick={() => setIsFormOpen(true)}
              className="flex items-center space-x-2 bg-university-gold text-university-green font-bold px-6 py-3 rounded-md hover:bg-yellow-500 transition-colors shadow-lg"
            >
              <Plus size={20} />
              <span>POST A JOB</span>
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-university-gold"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {jobs.length > 0 ? jobs.map(job => (
              <div key={job.id} className="premium-card bg-theme-card p-6 border-l-4 border-university-gold hover:translate-x-1 transition-all">
                <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                  <div className="flex-grow">
                    <div className="flex items-center space-x-3 mb-2">
                      <h2 className="text-xl font-bold text-theme-text">{job.jobTitle}</h2>
                      <span className="bg-university-green/10 text-university-green text-[10px] font-bold uppercase px-2 py-0.5 rounded border border-university-green/20">
                        {job.jobType}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-theme-muted mb-4 uppercase tracking-tighter">
                      <div className="flex items-center">
                        <Building size={14} className="mr-1.5 text-university-gold" />
                        {job.companyName}
                      </div>
                      <div className="flex items-center">
                        <MapPin size={14} className="mr-1.5 text-university-gold" />
                        {job.location}
                      </div>
                      <div className="flex items-center italic">
                        Posted by {job.postedBy}
                      </div>
                    </div>
                    <p className="text-theme-text text-sm mb-6 line-clamp-2">{job.jobDescription}</p>
                    <a 
                      href={job.applyLink} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-block border border-university-green text-university-green hover:bg-university-green hover:text-white px-6 py-2 rounded text-sm font-bold transition-colors"
                    >
                      APPLY NOW
                    </a>
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center py-20 bg-theme-card rounded-lg border border-theme-border italic text-theme-muted">
                No job postings available at the moment.
              </div>
            )}
          </div>
        )}

        {/* Post Job Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-theme-card w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
              <div className="bg-university-green p-6 text-white flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <Briefcase className="text-university-gold" size={24} />
                  <h2 className="text-xl font-bold uppercase tracking-tight">Post New Opportunity</h2>
                </div>
                <button onClick={() => setIsFormOpen(false)} className="text-white hover:text-university-gold transition-colors">
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handlePostJob} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-theme-text mb-1 uppercase tracking-tighter">Job Title</label>
                    <input name="jobTitle" required value={newJob.jobTitle} onChange={handleChange} className="w-full bg-theme-section border border-theme-border rounded px-4 py-2 text-theme-text focus:ring-1 focus:ring-university-gold transition-all" placeholder="e.g. Senior Product Manager" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-theme-text mb-1 uppercase tracking-tighter">Company Name</label>
                    <input name="companyName" required value={newJob.companyName} onChange={handleChange} className="w-full bg-theme-section border border-theme-border rounded px-4 py-2 text-theme-text focus:ring-1 focus:ring-university-gold transition-all" placeholder="e.g. Google" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-theme-text mb-1 uppercase tracking-tighter">Job Type</label>
                    <select name="jobType" value={newJob.jobType} onChange={handleChange} className="w-full bg-theme-section border border-theme-border rounded px-4 py-2 text-theme-text focus:ring-1 focus:ring-university-gold transition-all">
                      <option>Full-time</option>
                      <option>Internship</option>
                      <option>Part-time</option>
                      <option>Contract</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-theme-text mb-1 uppercase tracking-tighter">Location</label>
                    <input name="location" required value={newJob.location} onChange={handleChange} className="w-full bg-theme-section border border-theme-border rounded px-4 py-2 text-theme-text focus:ring-1 focus:ring-university-gold transition-all" placeholder="e.g. Hyderabad, Remote" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-theme-text mb-1 uppercase tracking-tighter">Apply Link</label>
                  <input name="applyLink" type="url" required value={newJob.applyLink} onChange={handleChange} className="w-full bg-theme-section border border-theme-border rounded px-4 py-2 text-theme-text focus:ring-1 focus:ring-university-gold transition-all" placeholder="https://..." />
                </div>

                <div>
                  <label className="block text-sm font-bold text-theme-text mb-1 uppercase tracking-tighter">Job Description</label>
                  <textarea name="jobDescription" rows="4" required value={newJob.jobDescription} onChange={handleChange} className="w-full bg-theme-section border border-theme-border rounded px-4 py-2 text-theme-text focus:ring-1 focus:ring-university-gold transition-all" placeholder="Role responsibilities, requirements, etc."></textarea>
                </div>

                <div className="flex justify-end pt-4 border-t border-theme-border">
                  <button 
                    disabled={isSubmitting}
                    type="submit" 
                    className="bg-university-green text-white font-bold px-10 py-3 rounded hover:bg-university-olive transition-all shadow-lg shadow-university-green/20"
                  >
                    {isSubmitting ? 'POSTING...' : 'PUBLISH OPPORTUNITY'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
