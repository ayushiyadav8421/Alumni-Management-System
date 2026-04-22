import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Filter, MapPin, Building, GraduationCap, X, Linkedin, Mail, Camera, Save } from 'lucide-react';
import { getAuthHeaders } from '../utils/auth';

const AlumniDirectory = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [alumniData, setAlumniData] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [filters, setFilters] = useState({
    schoolName: params.get('school') || '',
    batchYear: '',
    location: ''
  });

  useEffect(() => {
    fetch(`${API_URL}/api/alumni`)
      .then(res => res.json())
      .then(data => {
        setAlumniData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching alumni:', err);
        setLoading(false);
      });
  }, []);

  // Handle URL parameters for layout/features
  useEffect(() => {
    if (loading || alumniData.length === 0) return;

    const params = new URLSearchParams(location.search);
    
    // Handle filter activation from chatbot
    if (params.get('showFilter') === 'true') {
      const filterSidebar = document.getElementById('filter-sidebar');
      if (filterSidebar) {
        filterSidebar.scrollIntoView({ behavior: 'smooth' });
        filterSidebar.classList.add('ring-4', 'ring-university-gold', 'ring-opacity-50');
        setTimeout(() => {
          filterSidebar.classList.remove('ring-4', 'ring-university-gold', 'ring-opacity-50');
        }, 3000);
      }
    }

    // Handle auto-profile edit from chatbot
    if (params.get('editProfile') === 'true') {
      const loggedUser = JSON.parse(localStorage.getItem('alumniUser') || '{}');
      if (loggedUser.email || loggedUser.id) {
        const myProfile = alumniData.find(al => 
          (loggedUser.email && al.email === loggedUser.email) || 
          (loggedUser.id && String(al.id) === String(loggedUser.id))
        );
        if (myProfile) {
          setSelectedAlumni(myProfile);
          setIsEditing(true);
          setEditFormData({ ...myProfile, profilePhoto: null });
        } else {
          // If profile not found, maybe show a toast or message
          console.warn('Profile not found for auto-edit');
        }
      }
    }

    // Handle auto-open profile from chatbot
    if (params.get('profileId')) {
      const profileId = params.get('profileId');
      const profile = alumniData.find(al => String(al.id) === String(profileId));
      if (profile) {
        setSelectedAlumni(profile);
      }
    }
  }, [location.search, loading, alumniData]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const deleteAlumni = async (id) => {
    if (window.confirm('Are you sure you want to delete this alumni?')) {
      try {
        const response = await fetch(`${API_URL}/api/alumni/${id}`, {
          method: 'DELETE',
          headers: { ...getAuthHeaders() },
        });
        if (response.ok) {
          setAlumniData(alumniData.filter(al => al.id !== id));
        } else {
          alert('Failed to delete alumni.');
        }
      } catch (error) {
        console.error('Error deleting alumni:', error);
        alert('An error occurred during deletion.');
      }
    }
  };

  const loggedInUserStr = localStorage.getItem('alumniUser');
  const loggedInUser = loggedInUserStr ? JSON.parse(loggedInUserStr) : {};
  const isAlumni = loggedInUser.role?.toLowerCase() === 'alumni';

  const handleEditClick = (alum) => {
    setEditFormData({
      ...alum,
      profilePhoto: null
    });
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setEditFormData({ ...editFormData, profilePhoto: e.target.files[0] });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    
    const formData = new FormData();
    Object.keys(editFormData).forEach(key => {
      if (key === 'profilePhoto' && editFormData[key]) {
        formData.append('profilePhoto', editFormData[key]);
      } else if (editFormData[key] !== null && editFormData[key] !== undefined) {
        formData.append(key, editFormData[key]);
      }
    });

    try {
      const response = await fetch(`${API_URL}/api/alumni/${selectedAlumni.id}`, {
        method: 'PUT',
        headers: { ...getAuthHeaders() },
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        // Refresh data
        const updatedData = await fetch(`${API_URL}/api/alumni`).then(res => res.json());
        setAlumniData(updatedData);
        setSelectedAlumni(updatedData.find(a => String(a.id) === String(selectedAlumni.id)));
        setIsEditing(false);
        alert('Profile updated successfully!');
      } else {
        const err = await response.json();
        alert(err.error || 'Failed to update profile.');
      }
    } catch (error) {
      console.error('Update Error:', error);
      alert('An error occurred during update.');
    } finally {
      setUpdateLoading(false);
    }
  };

  const filteredAlumni = alumniData.filter(al => {
    return (
      (filters.schoolName === '' || al.school === filters.schoolName) &&
      (filters.batchYear === '' || al.batchYear?.toString() === filters.batchYear) &&
      (filters.location === '' || 
        al.fullName?.toLowerCase().includes(filters.location.toLowerCase()) || 
        al.companyName?.toLowerCase().includes(filters.location.toLowerCase()) ||
        al.location?.toLowerCase().includes(filters.location.toLowerCase()))
    );
  });

  // Handle salary sorting if requested
  const isSortingBySalary = params.get('sortBySalary') === 'true';
  const displayAlumni = isSortingBySalary 
    ? [...filteredAlumni].sort((a, b) => (b.salary || 0) - (a.salary || 0))
    : filteredAlumni;

  const getImageUrl = (alum) => {
    const imagePath = alum.profile_image || alum.profilePhoto || alum.profilePhotoUrl;
    if (!imagePath) return "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2000&auto=format&fit=crop";
    if (imagePath.startsWith('http')) return imagePath;
    return `${API_URL}${imagePath}`;
  };

  const formatSalary = (salary) => {
    if (!salary || isNaN(salary)) return '0';
    const lpa = salary / 100000;
    return lpa % 1 === 0 ? lpa.toString() : lpa.toFixed(1);
  };

  return (
    <div className="bg-theme-bg min-h-screen py-10 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-university-green dark:text-theme-text mb-3 transition-colors tracking-tight">
            {filters.schoolName ? `${filters.schoolName} Alumni Directory` : 'Global Alumni Directory'}
          </h1>
          <div className="w-20 h-1.5 bg-university-gold mx-auto mb-4 rounded-full"></div>
          <p className="text-theme-muted max-w-2xl mx-auto transition-colors">
            {filters.schoolName 
              ? `Connecting professionals and graduates from the ${filters.schoolName} community.`
              : 'Connect and network with our community of over 500+ professionals across the globe.'}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Filters Sidebar */}
          <div className="w-full lg:w-1/4" id="filter-sidebar">
            <div className="premium-card p-6 bg-theme-card">
              <div className="flex items-center mb-6 border-b border-theme-border pb-4">
                <Filter className="text-university-gold mr-2" size={20} />
                <h2 className="text-lg font-bold text-theme-text">Filter Alumni</h2>
              </div>
              
              <div className="space-y-5">
                {/* School Filter */}
                <div>
                  <label className="block text-sm font-medium text-theme-text mb-1 transition-colors">School Name</label>
                  <select 
                    name="schoolName"
                    value={filters.schoolName}
                    onChange={handleFilterChange}
                    className="w-full pl-3 pr-10 py-2 text-sm border-theme-border bg-theme-section text-theme-text border rounded-md focus:outline-none focus:ring-university-gold focus:border-university-gold transition-colors"
                  >
                    <option value="">All Schools</option>
                    <option value="SEAS">SEAS</option>
                    <option value="ESLA">ESLA</option>
                    <option value="PSB">PSB</option>
                  </select>
                </div>
                
                {/* Batch Filter */}
                <div>
                  <label className="block text-sm font-medium text-theme-text mb-1 transition-colors">Batch Year</label>
                  <select 
                    name="batchYear"
                    value={filters.batchYear}
                    onChange={handleFilterChange}
                    className="w-full pl-3 pr-10 py-2 text-sm border-theme-border bg-theme-section text-theme-text border rounded-md focus:outline-none focus:ring-university-gold focus:border-university-gold transition-colors"
                  >
                    <option value="">All Years</option>
                    {[2024, 2023, 2022, 2021, 2020, 2019].map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
                
                {/* Location/Company Filter */}
                <div>
                  <label className="block text-sm font-medium text-theme-text mb-1 transition-colors">Keyword Search</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      name="location"
                      value={filters.location}
                      onChange={handleFilterChange}
                      placeholder="Name, Company, Location..." 
                      className="w-full pl-3 pr-3 py-2 text-sm border-theme-border bg-theme-section text-theme-text placeholder-theme-muted border rounded-md focus:outline-none focus:ring-university-gold focus:border-university-gold transition-colors"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    onClick={() => setFilters({ schoolName: '', batchYear: '', location: '' })}
                    className="w-full py-2 bg-theme-section border border-theme-border hover:bg-theme-border text-theme-text font-medium rounded-md transition-colors text-sm"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Area */}
          <div className="w-full lg:w-3/4">
            
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-university-gold"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayAlumni.length > 0 ? displayAlumni.map((alum, index) => (
                  <div key={alum.id} className={`premium-card bg-theme-card rounded-xl overflow-hidden group ${isSortingBySalary && index < 3 ? 'ring-2 ring-university-gold shadow-[0_0_15px_rgba(255,191,0,0.3)]' : ''}`}>
                    <div className="h-20 bg-gradient-to-r from-university-green to-university-olive w-full relative">
                      {isSortingBySalary && index < 3 && (
                        <div className="absolute top-2 right-2 px-2 py-0.5 bg-university-gold text-university-green text-[10px] font-black rounded uppercase">
                          #{index + 1} Top Earner
                        </div>
                      )}
                    </div>
                    <div className="px-6 pb-6 relative text-center">
                      <div className="w-20 h-20 rounded-full border-4 border-theme-card overflow-hidden bg-theme-section shadow-sm inline-block -mt-10 mb-3 relative z-10 transition-colors">
                        <img 
                          src={getImageUrl(alum)} 
                          alt={alum.fullName} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <h3 className="text-lg font-bold text-theme-text leading-tight transition-colors">{alum.fullName}</h3>
                      <p className="text-university-gold text-xs font-bold uppercase mt-1 mb-3">{alum.school} &apos;{alum.batchYear}</p>
                      
                      <div className="space-y-1.5 text-sm text-theme-text text-left bg-theme-section p-3 rounded border border-theme-border mb-4 transition-colors">
                        <div className="flex items-center">
                          <Building size={14} className="text-university-gold mr-2 shrink-0" />
                          <span className="truncate">{alum.companyName}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin size={14} className="text-university-gold mr-2 shrink-0" />
                          <span className="truncate">{alum.location}</span>
                        </div>
                        <div className="flex items-center">
                          <GraduationCap size={14} className="text-university-gold mr-2 shrink-0" />
                          <span className="truncate">{alum.department}</span>
                        </div>
                        {alum.salary > 0 && (
                          <div className="mt-2 pt-2 border-t border-theme-border flex items-center justify-between">
                            <span className="text-[10px] font-bold text-theme-muted uppercase">Salary (CTC)</span>
                            <span className="text-xs font-black text-university-green dark:text-university-gold">₹{formatSalary(alum.salary)} LPA</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setSelectedAlumni(alum)}
                          className="flex-1 py-1.5 border border-university-green text-university-green dark:text-theme-text hover:bg-university-green dark:hover:bg-university-gold hover:text-white dark:border-theme-border rounded text-sm font-medium transition-colors"
                        >
                          View Profile
                        </button>
                        {isAlumni && (
                          <button 
                            onClick={() => deleteAlumni(alum.id)}
                            className="px-3 py-1.5 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded text-sm font-medium transition-colors"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="col-span-full text-center py-20 bg-theme-card rounded-lg border border-theme-border transition-colors">
                    <p className="text-theme-muted font-medium">No alumni found. Be the first to join!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Popup */}
      {selectedAlumni && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-theme-card w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in duration-200">
            <div className="relative h-32 bg-university-green">
              <button 
                onClick={() => setSelectedAlumni(null)}
                className="absolute top-4 right-4 text-white hover:text-university-gold transition-colors z-20"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="px-8 pb-8 relative">
              <div className="absolute -top-16 left-8 group">
                <div className="bg-theme-card rounded-full p-1 shadow-lg relative overflow-hidden w-32 h-32">
                  <img 
                    src={editFormData.profilePhoto ? URL.createObjectURL(editFormData.profilePhoto) : getImageUrl(selectedAlumni)} 
                    alt={selectedAlumni.fullName} 
                    className="w-full h-full rounded-full object-cover border-4 border-theme-card" 
                  />
                  {isEditing && (
                    <label className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="text-white" size={24} />
                      <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                    </label>
                  )}
                </div>
              </div>
              
              <div className="pt-20">
                {!isEditing ? (
                  <>
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-3xl font-bold text-theme-text">{selectedAlumni.fullName}</h2>
                        <p className="text-university-gold font-bold uppercase tracking-wider">{selectedAlumni.school} &apos;{selectedAlumni.batchYear}</p>
                      </div>
                      <div className="flex space-x-3">
                        {((loggedInUser.email && loggedInUser.email === selectedAlumni.email) || (loggedInUser.id && String(loggedInUser.id) === String(selectedAlumni.id))) && (
                          <button 
                            onClick={() => handleEditClick(selectedAlumni)}
                            className="px-4 py-2 bg-university-green text-white rounded-lg flex items-center hover:bg-university-olive transition-colors font-bold text-sm"
                          >
                            Edit Profile
                          </button>
                        )}
                        {selectedAlumni.linkedin && (
                          <a href={selectedAlumni.linkedin} target="_blank" rel="noreferrer" className="p-2 bg-theme-section text-university-green hover:text-university-gold border border-theme-border rounded-full">
                            <Linkedin size={20} />
                          </a>
                        )}
                        <a href={`mailto:${selectedAlumni.email}`} className="p-2 bg-theme-section text-university-green hover:text-university-gold border border-theme-border rounded-full">
                          <Mail size={20} />
                        </a>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mt-8">
                      <div>
                        <h4 className="text-xs font-bold text-theme-muted uppercase tracking-widest mb-2">Current Role</h4>
                        <p className="font-semibold text-theme-text">{selectedAlumni.jobTitle} at {selectedAlumni.companyName}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-theme-muted uppercase tracking-widest mb-2">Department</h4>
                        <p className="font-semibold text-theme-text">{selectedAlumni.department}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-theme-muted uppercase tracking-widest mb-2">Location</h4>
                        <p className="font-semibold text-theme-text">{selectedAlumni.location}</p>
                      </div>
                      {selectedAlumni.salary > 0 && (
                        <div>
                          <h4 className="text-xs font-bold text-theme-muted uppercase tracking-widest mb-2">Current Salary</h4>
                          <p className="font-black text-university-green dark:text-university-gold text-lg">₹{formatSalary(selectedAlumni.salary)} LPA</p>
                        </div>
                      )}
                      {selectedAlumni.phoneNumber && (
                         <div>
                          <h4 className="text-xs font-bold text-theme-muted uppercase tracking-widest mb-2">Phone</h4>
                          <p className="font-semibold text-theme-text">{selectedAlumni.phoneNumber}</p>
                        </div>
                      )}
                    </div>

                    <div className="mt-8 pt-8 border-t border-theme-border">
                      <h4 className="text-xs font-bold text-theme-muted uppercase tracking-widest mb-3">About</h4>
                      <p className="text-theme-text leading-relaxed italic">
                        {selectedAlumni.bio || "No biography provided."}
                      </p>
                    </div>
                  </>
                ) : (
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="block text-xs font-bold text-theme-muted uppercase mb-1">Full Name</label>
                        <input name="fullName" value={editFormData.fullName || ''} onChange={handleEditChange} className="w-full p-2 bg-theme-section border border-theme-border rounded text-theme-text text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-theme-muted uppercase mb-1">Company</label>
                        <input name="companyName" value={editFormData.companyName || ''} onChange={handleEditChange} className="w-full p-2 bg-theme-section border border-theme-border rounded text-theme-text text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-theme-muted uppercase mb-1">Job Role</label>
                        <input name="jobTitle" value={editFormData.jobTitle || ''} onChange={handleEditChange} className="w-full p-2 bg-theme-section border border-theme-border rounded text-theme-text text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-theme-muted uppercase mb-1">Location</label>
                        <input name="location" value={editFormData.location || ''} onChange={handleEditChange} className="w-full p-2 bg-theme-section border border-theme-border rounded text-theme-text text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-theme-muted uppercase mb-1">Salary (₹ LPA)</label>
                        <input name="salary" type="number" value={editFormData.salary || ''} onChange={handleEditChange} className="w-full p-2 bg-theme-section border border-theme-border rounded text-theme-text text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-theme-muted uppercase mb-1">Phone Number</label>
                        <input name="phoneNumber" value={editFormData.phoneNumber || ''} onChange={handleEditChange} className="w-full p-2 bg-theme-section border border-theme-border rounded text-theme-text text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-theme-muted uppercase mb-1">LinkedIn Link</label>
                        <input name="linkedin" value={editFormData.linkedin || ''} onChange={handleEditChange} className="w-full p-2 bg-theme-section border border-theme-border rounded text-theme-text text-sm" />
                      </div>
                    </div>
                    
                    <div className="pt-6 flex justify-end space-x-3">
                      <button 
                        type="button" 
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 border border-theme-border text-theme-text rounded-lg hover:bg-theme-section transition-colors font-bold text-sm"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        disabled={updateLoading}
                        className="px-6 py-2 bg-university-gold text-university-green rounded-lg flex items-center hover:bg-theme-border transition-colors font-black text-sm disabled:opacity-50"
                      >
                        {updateLoading ? 'Saving...' : <><Save size={18} className="mr-2" /> Save Changes</>}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlumniDirectory;
