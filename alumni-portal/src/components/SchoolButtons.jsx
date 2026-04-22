import { Link } from 'react-router-dom';
import { MonitorPlay, BookOpenCheck, LineChart, Cpu } from 'lucide-react';

import { useState, useEffect } from 'react';

const SchoolButtons = () => {
  const [counts, setCounts] = useState({});
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/alumni/count-by-school`);
      const data = await response.json();
      setCounts(data);
    } catch (error) {
      console.error('Error fetching school counts:', error);
    }
  };

  const schools = [
    {
      id: 'seas',
      name: 'School of Engineering and Sciences',
      abbr: 'SEAS',
      icon: <Cpu className="w-12 h-12 mb-4" />,
      bgColor: 'bg-[#eef5ee]',
      iconColor: 'text-[#2F3E2F]',
      titleColor: 'text-[#2F3E2F]'
    },
    {
      id: 'esla',
      name: 'Eshwari School of Liberal Arts',
      abbr: 'ESLA',
      icon: <BookOpenCheck className="w-12 h-12 mb-4" />,
      bgColor: 'bg-[#faf6ea]',
      iconColor: 'text-[#5A5F2C]',
      titleColor: 'text-[#5A5F2C]'
    },
    {
      id: 'psb',
      name: 'Paari School of Business',
      abbr: 'PSB',
      icon: <LineChart className="w-12 h-12 mb-4" />,
      bgColor: 'bg-[#f8f6ef]',
      iconColor: 'text-[#C49A3A]',
      titleColor: 'text-[#2F3E2F]'
    }
  ];

  return (
    <section className="py-20 bg-theme-section transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-theme-text transition-colors tracking-tight">Explore Alumni by School</h2>
          <div className="w-24 h-2 bg-university-gold mx-auto mt-6 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {schools.map((school) => (
            <Link 
                key={school.id} 
                to={`/school/${school.id.toLowerCase()}`}
                className={`group p-8 rounded-3xl ${school.bgColor} border border-theme-border/50 hover:border-university-gold hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 flex flex-col h-full items-center text-center shadow-sm`}
            >
              <div className={`${school.iconColor} transform group-hover:scale-110 transition-transform duration-300`}>
                {school.icon}
              </div>
              <h3 className={`text-2xl font-black mb-2 tracking-wide ${school.titleColor}`}>
                {school.abbr} ({counts[school.abbr] || 0})
              </h3>
              <p className="text-sm font-semibold text-[#555] mt-2 mb-6 flex-grow leading-relaxed">
                {school.name}
              </p>
              
              <span className="mt-auto inline-flex items-center text-sm font-bold uppercase tracking-widest bg-[#2F3E2F] text-white rounded-lg px-8 py-3 hover:bg-[#5A5F2C] transition-all shadow-md group-hover:shadow-lg">
                Visit Dashboard
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SchoolButtons;
