import React from 'react';

const AdvisoryBoard = () => {
  const members = [
    { 
      name: "Dr. Srabani Basu", 
      title: "Faculty Incharge – Alumni Affairs", 
      position: "Chairperson",
      isLeadership: true 
    },
    { name: "Mr Rajarshi Mazumder", title: "IT Technical Engineer, PVP Inc., Japan" },
    { name: "Mr Pavan Krishna", title: "Sr. Tech Associate, Bank of America, India" },
    { name: "Mr Bismark Razak Haruna", title: "Master's Program, Erasmus Mundus Scholar, University of Lorraine, France" },
    { name: "Mr Miran Tafazzul Hussain Junaidi", title: "Co-Founder, OurEye.ai" },
    { name: "Ms Abirami Ravishankar", title: "Master's Program at New York University, USA" },
    { name: "Mr Aaditya Jain", title: "Masters in Management at ESMT Berlin- Germany's no.1 Business school" },
    { name: "Mr Agniswar Paul", title: "Master's Program at Georgia Tech, USA" },
    { name: "Ms Yasaswy Veeranki", title: "Data Processing Specialist, Nielsen IQ, India" },
    { name: "Mr Akash Yadav", title: "M. Tech. at Indian Institute of Technology, Indore (IIT-Indore)" },
    { name: "Ms Mohammad Nilofer Sultana", title: "Business Analyst, Barclays, India" }
  ];

  const responsibilities = [
    "The term of the board is for one year and extendable.",
    "Quarterly meetings with departments.",
    "Mentoring current students.",
    "Providing career guidance and internships."
  ];

  const benefits = [
    "Official recognition as SRM-AP Brand Ambassador",
    "Scholarship opportunities for siblings",
    "Online and offline library access",
    "Accommodation support during visits",
    "Fast academic transcript processing",
    "Participation in professional programs",
    "Placement drive participation"
  ];

  return (
    <div className="py-20 bg-theme-bg min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Banner Section */}
        <div className="mb-20 text-center">
          <h2 className="text-university-gold font-black text-sm uppercase tracking-[0.2em] mb-4">Strategic Advisory</h2>
          <h1 className="text-4xl lg:text-5xl font-black text-theme-text mb-12 transition-colors">
            Alumni <span className="text-university-green">Advisory Board</span>
          </h1>
          
          <div className="premium-card bg-theme-card p-4 rounded-3xl shadow-3xl border border-theme-border max-w-5xl mx-auto overflow-hidden">
            <img 
              src="/images/advisory_board_banner.png" 
              alt="Alumni Advisory Board Introducing Alumni Ambassadors" 
              className="w-full h-auto rounded-2xl"
            />
          </div>
        </div>

        {/* 1. Member Grid - Now First */}
        <div className="mb-20">
          <h3 className="text-3xl font-black text-theme-text text-center mb-12 transition-colors">Members of the Alumni Advisory Board</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {members.map((member, idx) => (
              <div 
                key={idx} 
                className={`premium-card p-8 rounded-2xl border transition-all group flex items-start space-x-6 ${
                  member.isLeadership 
                    ? 'bg-university-green/5 border-university-gold shadow-lg ring-1 ring-university-gold/20 col-span-full mb-4' 
                    : 'bg-theme-card border-theme-border hover:border-university-gold'
                }`}
              >
                 <div className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 border ${
                   member.isLeadership 
                     ? 'bg-university-gold text-university-green border-white/20' 
                     : 'bg-university-green/10 border-university-gold/20'
                 }`}>
                    <span className={`text-2xl font-black ${member.isLeadership ? 'text-university-green' : 'text-university-gold'}`}>
                       {member.name.charAt(0)}
                    </span>
                 </div>
                 <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className={`text-xl font-bold transition-colors ${member.isLeadership ? 'text-university-green dark:text-university-gold' : 'text-theme-text group-hover:text-university-gold'}`}>
                        {member.name}
                      </h4>
                      {member.position && (
                        <span className="px-3 py-1 bg-university-gold text-university-green text-[10px] font-black uppercase tracking-widest rounded-full">
                          {member.position}
                        </span>
                      )}
                    </div>
                    <p className={`text-sm mt-2 leading-relaxed font-medium ${member.isLeadership ? 'text-theme-text' : 'text-theme-muted'}`}>
                      {member.title}
                    </p>
                 </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2 & 3. Board Policies - Now After Members */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="premium-card bg-theme-section p-10 rounded-3xl border-l-[12px] border-university-green shadow-xl">
            <h3 className="text-2xl font-black text-theme-text mb-6 transition-colors">Responsibilities of Alumni Advisory Board</h3>
            <ul className="space-y-4">
              {responsibilities.map((item, idx) => (
                <li key={idx} className="flex items-start text-theme-muted transition-colors leading-relaxed">
                  <span className="w-2.5 h-2.5 rounded-full bg-university-gold mt-1.5 mr-4 shrink-0 shadow-sm shadow-university-gold/40"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="premium-card bg-theme-section p-10 rounded-3xl border-l-[12px] border-university-gold shadow-xl">
            <h3 className="text-2xl font-black text-theme-text mb-6 transition-colors">Benefits for Alumni Advisory Board Members</h3>
            <ul className="space-y-4">
              {benefits.map((item, idx) => (
                <li key={idx} className="flex items-start text-theme-muted transition-colors leading-relaxed">
                  <span className="w-2.5 h-2.5 rounded-full bg-university-green mt-1.5 mr-4 shrink-0 shadow-sm shadow-university-green/40"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvisoryBoard;
