import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Users, MessageSquare, Calendar, ChevronRight, GraduationCap } from 'lucide-react';

const SchoolPortal = () => {
  const { schoolCode } = useParams();
  
  const schoolConfig = {
    seas: {
      name: 'SEAS',
      fullName: 'School of Engineering and Applied Sciences',
      color: 'university-green'
    },
    esla: {
      name: 'ESLA',
      fullName: 'School of Liberal Arts and Social Sciences',
      color: 'university-olive'
    },
    psb: {
      name: 'PSB',
      fullName: 'Paari School of Business',
      color: 'university-gold'
    }
  };

  const currentSchool = schoolConfig[schoolCode.toLowerCase()] || schoolConfig.seas;

  const options = [
    {
      title: 'Alumni Directory',
      description: `View and connect with all alumni from ${currentSchool.name}`,
      icon: <Users size={32} />,
      link: `/alumni-directory?school=${currentSchool.name}`,
      bgColor: 'bg-[#e8f0fe]',
      textColor: 'text-blue-600',
      titleColor: 'text-[#2F3E2F]'
    },
    {
      title: 'Alumni Chat',
      description: `Real-time messaging with ${currentSchool.name} community`,
      icon: <MessageSquare size={32} />,
      link: `/alumni-chat?school=${currentSchool.name}`,
      bgColor: 'bg-[#e8f5e9]',
      textColor: 'text-university-green',
      titleColor: 'text-[#2F3E2F]'
    },
    {
      title: 'Upcoming Events',
      description: `Discover exclusive events for ${currentSchool.name} alumni`,
      icon: <Calendar size={32} />,
      link: `/events?school=${currentSchool.name}`,
      bgColor: 'bg-[#fff6e0]',
      textColor: 'text-university-gold',
      titleColor: 'text-[#2F3E2F]'
    }
  ];

  return (
    <div className="bg-theme-bg min-h-screen py-16 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
           <div className="inline-flex items-center space-x-2 bg-theme-section border border-theme-border px-4 py-2 rounded-full mb-6 transition-colors">
              <GraduationCap className="text-university-gold" size={20} />
              <span className="text-xs font-black tracking-widest text-theme-muted uppercase">{currentSchool.fullName}</span>
           </div>
           <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-theme-text mb-6 leading-tight transition-colors">
             Welcome to <span className="text-university-green dark:text-university-gold">{currentSchool.name}</span> Alumni Network
           </h1>
           <div className="w-24 h-1.5 bg-university-gold mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {options.map((option, index) => (
            <Link 
              key={index} 
              to={option.link}
              className="group bg-theme-card border border-theme-border rounded-2xl p-8 hover:border-university-gold hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col h-full"
            >
              <div className={`w-16 h-16 ${option.bgColor} ${option.textColor} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                {option.icon}
              </div>
              <h3 className={`text-2xl font-black mb-4 transition-colors ${option.titleColor}`}>
                {option.title}
              </h3>
              <p className="text-[#555] font-medium mb-8 flex-grow leading-relaxed transition-colors">
                {option.description}
              </p>
              <div className="flex items-center font-black text-sm uppercase tracking-widest text-[#C49A3A] group-hover:scale-105 transition-all">
                <span>Explore</span>
                <ChevronRight size={18} className="ml-1 transform group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-20 p-10 bg-theme-section rounded-3xl border border-theme-border text-center transition-colors">
           <h4 className="text-xl font-bold text-theme-text mb-4 transition-colors">Need dedicated support for {currentSchool.name}?</h4>
           <p className="text-theme-muted max-w-2xl mx-auto mb-8 transition-colors">
             Our school-specific alumni coordinators are here to assist you with mentorship, internships, and networking opportunities.
           </p>
           <Link 
             to="/contact" 
             className="inline-flex items-center bg-university-green text-white font-black py-3 px-8 rounded-xl hover:bg-university-olive transition-all shadow-lg"
           >
             Contact School Office
           </Link>
        </div>
      </div>
    </div>
  );
};

export default SchoolPortal;
