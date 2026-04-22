import { Briefcase, Building2, MapPin, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const AchieversSection = () => {
  const [achievers, setAchievers] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchTopAchievers();
  }, []);

  const fetchTopAchievers = async () => {
    try {
      const response = await fetch(`${API_URL}/api/alumni/top-achievers`);
      const data = await response.json();
      setAchievers(data);
    } catch (error) {
      console.error('Error fetching top achievers:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatSalary = (salary) => {
    if (!salary || isNaN(salary)) return '0';
    const lpa = salary / 100000;
    return lpa % 1 === 0 ? lpa.toString() : lpa.toFixed(1);
  };

  if (loading) return null;
  if (achievers.length === 0) return null;

  return (
    <section className="py-20 bg-theme-section transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Award className="text-university-gold w-8 h-8" />
            <h2 className="text-4xl font-bold text-theme-text tracking-tight transition-colors">Distinguished Achievers</h2>
            <Award className="text-university-gold w-8 h-8" />
          </div>
          <p className="text-lg text-theme-muted max-w-2xl mx-auto transition-colors">
            Celebrating the exceptional accomplishments of our alumni making a global impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievers.map((alum) => (
            <div key={alum.id} className="premium-card overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
              <div className="relative">
                <div className="h-32 bg-university-green w-full"></div>
                <div className="absolute top-12 w-full flex justify-center">
                  <div className="w-32 h-32 rounded-full border-4 border-theme-card overflow-hidden bg-theme-section shadow-md transition-colors">
                    <img 
                      src={alum.profilePhotoUrl ? `${API_URL}${alum.profilePhotoUrl}` : `https://images.unsplash.com/photo-${1500000000000 + alum.id % 1000}?q=80&w=200&h=200&auto=format&fit=crop`} 
                      alt={alum.fullName} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-16 pb-6 px-6 text-center">
                <div className="mb-2">
                  <span className="bg-university-gold/20 text-university-gold text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest border border-university-gold/20">
                    {alum.school} Top Achiever
                  </span>
                </div>
                <h3 className="text-xl font-bold text-theme-text mb-1 transition-colors">{alum.fullName}</h3>
                <p className="text-university-gold text-sm font-bold tracking-wide uppercase mb-4">
                  {alum.department} &apos;{alum.batchYear}
                </p>
                
                <div className="space-y-2 mb-6 text-sm text-theme-text text-left bg-theme-section p-4 rounded-lg border border-theme-border transition-colors relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 opacity-10">
                    <Award size={48} className="text-university-gold" />
                  </div>
                  <div className="flex items-center">
                    <Briefcase size={16} className="text-university-gold mr-3 shrink-0" />
                    <span className="font-semibold">{alum.jobTitle}</span>
                  </div>
                  <div className="flex items-center">
                    <Building2 size={16} className="text-university-gold mr-3 shrink-0" />
                    <span>{alum.companyName}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={16} className="text-university-gold mr-3 shrink-0" />
                    <span>{alum.location}</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-theme-border flex items-center justify-between">
                     <span className="text-[10px] font-black text-theme-muted uppercase tracking-widest">Current CTC</span>
                      <span className="bg-university-gold text-university-green font-black px-3 py-1 rounded-full text-xs shadow-md">
                        ₹{formatSalary(alum.salary)} LPA
                      </span>
                  </div>
                </div>
                
                <p className="text-theme-muted text-sm italic border-l-2 border-university-gold pl-3 text-left transition-colors line-clamp-2">
                  "{alum.bio}"
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/alumni-directory" className="bg-transparent border-2 border-university-green text-university-green dark:text-white hover:bg-university-green hover:text-white font-bold py-3 px-8 rounded-full transition-colors inline-block shadow-sm">
            View Alumni Directory
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AchieversSection;
