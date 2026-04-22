import { useParams, Link } from 'react-router-dom';
import { Users, Calendar, Award, MessageSquare } from 'lucide-react';

const schoolInfo = {
  'seas': { 
    name: 'School of Engineering and Sciences', 
    bg: 'from-blue-950 to-blue-900',
    stats: { alumni: '2,840', mentors: '85', labs: '24' }
  },
  'esla': { 
    name: 'Eshwari School of Liberal Arts', 
    bg: 'from-red-950 to-red-900',
    stats: { alumni: '1,120', mentors: '42', labs: '8' }
  },
  'psb': { 
    name: 'Paari School of Business', 
    bg: 'from-green-950 to-green-900',
    stats: { alumni: '1,560', mentors: '64', labs: '5' }
  }
};

const SchoolDashboard = () => {
  const { schoolId } = useParams();
  const info = schoolInfo[schoolId] || schoolInfo['seas'];

  // Mock school-specific alumni
  const schoolAlumni = [
    { name: `Alumnus A (${schoolId.toUpperCase()})`, role: 'Sr. Lead', year: '2021' },
    { name: `Alumnus B (${schoolId.toUpperCase()})`, role: 'Product Manager', year: '2022' },
    { name: `Alumnus C (${schoolId.toUpperCase()})`, role: 'Data Scientist', year: '2020' },
  ];

  return (
    <div className="min-h-screen bg-theme-bg transition-colors duration-300">
      {/* School Banner */}
      <div className={`bg-gradient-to-r ${info.bg} py-20 text-white relative overflow-hidden transition-all duration-700`}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight animate-in slide-in-from-bottom duration-700">{info.name}</h1>
          <div className="w-24 h-1.5 bg-university-gold mx-auto mb-6 rounded-full"></div>
          <p className="text-2xl text-university-gold font-bold italic">Exclusive Alumni Hub</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* School Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { label: 'Total Alumni', value: info.stats.alumni, icon: <Users className="text-university-gold" /> },
                { label: 'Mentors', value: info.stats.mentors, icon: <Award className="text-university-gold" /> },
                { label: 'Active Projects', value: info.stats.labs, icon: <MessageSquare className="text-university-gold" /> },
              ].map((stat, idx) => (
                <div key={idx} className="premium-card p-6 bg-theme-card border-l-4 border-university-gold flex flex-col items-center">
                  <div className="mb-2">{stat.icon}</div>
                  <div className="text-3xl font-black text-theme-text">{stat.value}</div>
                  <div className="text-xs uppercase font-bold text-theme-muted tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Action Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Link to="/directory" className="premium-card p-8 bg-theme-card hover:bg-university-green hover:text-white flex items-center group transition-all">
                <div className="w-16 h-16 bg-theme-section group-hover:bg-white/10 rounded-2xl flex items-center justify-center mr-6 transition-all">
                  <Users size={32} className="text-university-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-black transition-colors">Registered Students</h3>
                  <p className="text-sm opacity-80 transition-colors">View all students under {schoolId.toUpperCase()}</p>
                </div>
              </Link>
              <Link to="/mentorship" className="premium-card p-8 bg-theme-card hover:bg-university-green hover:text-white flex items-center group transition-all">
                <div className="w-16 h-16 bg-theme-section group-hover:bg-white/10 rounded-2xl flex items-center justify-center mr-6 transition-all">
                  <Award size={32} className="text-university-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-black transition-colors">Mentorship Section</h3>
                  <p className="text-sm opacity-80 transition-colors">Guidance for {info.name.split(' ')[0]} students</p>
                </div>
              </Link>
            </div>

            {/* School specific events */}
            <div className="premium-card bg-theme-card p-10 shadow-xl border border-theme-border">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-3xl font-black text-theme-text flex items-center transition-colors tracking-tight">
                  <Calendar className="mr-4 text-university-gold" size={32} /> School Events
                </h3>
                <button className="text-sm font-black text-university-green dark:text-university-gold hover:underline tracking-widest uppercase">View All</button>
              </div>
              
              <div className="space-y-6">
                {[1, 2].map((i) => (
                  <div key={i} className="flex flex-col sm:flex-row border border-theme-border rounded-2xl p-6 hover:shadow-2xl transition-all hover:border-university-gold/40 bg-theme-section/30 group">
                     <div className="bg-university-green rounded-xl p-4 text-center sm:w-28 mb-6 sm:mb-0 sm:mr-6 shadow-lg group-hover:scale-105 transition-transform">
                       <div className="text-xs text-university-gold uppercase font-black tracking-widest mb-1">DEC</div>
                       <div className="text-3xl font-black text-white">1{i}</div>
                     </div>
                     <div className="flex-grow">
                        <div className="flex items-center space-x-2 mb-2">
                           <span className="bg-university-gold/20 text-university-gold text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-tighter">Departmental</span>
                        </div>
                        <h4 className="text-xl font-black text-theme-text mb-2 transition-colors group-hover:text-university-green dark:group-hover:text-university-gold">
                          {info.name.split(' ')[1]} Alumni Research Forum {2026-i}
                        </h4>
                        <p className="text-sm text-theme-muted mb-4 transition-colors leading-relaxed">
                          Collaborative session between alumni and current researchers focusing on industry trends in {schoolId === 'seas' ? 'Engineering' : schoolId === 'psb' ? 'Business' : 'Liberal Arts'}.
                        </p>
                        <div className="flex items-center text-xs font-bold text-theme-text">
                           <MapPin size={14} className="text-university-gold mr-2" />
                           Campus Auditorium / Hybrid
                        </div>
                     </div>
                  </div>
                ))}
              </div>
            </div>

            {/* School-specific Alumni Profiles */}
            <div className="premium-card bg-theme-card p-10 shadow-xl border border-theme-border">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-3xl font-black text-theme-text transition-colors tracking-tight uppercase">Alumni Profiles</h3>
                <button className="text-sm font-black text-university-green dark:text-university-gold hover:underline tracking-widest">SEE FULL DIRECTORY</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {schoolAlumni.map((alum, i) => (
                   <div key={i} className="bg-theme-section/50 border border-theme-border rounded-2xl p-6 text-center transition-all hover:shadow-xl hover:-translate-y-2 group">
                      <div className="w-24 h-24 bg-theme-card rounded-full mx-auto mb-4 overflow-hidden border-4 border-university-gold/20 group-hover:border-university-gold transition-all relative shadow-lg">
                         <img src={`https://images.unsplash.com/photo-${1500000000000+i*1000}?q=80&w=200&h=200&auto=format&fit=crop`} alt="User" />
                         <div className="absolute inset-0 bg-university-green opacity-0 group-hover:opacity-20 transition-opacity"></div>
                      </div>
                      <h4 className="font-black text-lg text-theme-text transition-colors mb-1">{alum.name}</h4>
                      <p className="text-xs font-bold text-university-gold uppercase tracking-tighter mb-4">Class of {alum.year} | {alum.role}</p>
                      <button className="w-full text-xs font-black text-university-green dark:text-theme-text border-2 border-university-green dark:border-theme-border rounded-full py-2 hover:bg-university-green hover:text-white transition-all transform active:scale-95 shadow-sm">VIEW PROFILE</button>
                   </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar Chatbox/Community */}
          <div className="lg:col-span-1 space-y-12">
            <div className="premium-card bg-theme-card p-0 overflow-hidden flex flex-col h-[600px] shadow-2xl border border-theme-border">
              <div className={`bg-gradient-to-r ${info.bg} p-6 text-white flex items-center justify-between transition-colors`}>
                <div className="flex items-center">
                  <MessageSquare className="mr-3 text-university-gold shadow-sm" />
                  <h3 className="font-black text-xl tracking-tight">{schoolId.toUpperCase()} Community</h3>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
              </div>
              
              <div className="flex-grow p-6 bg-theme-section/50 overflow-y-auto space-y-6 transition-colors scrollbar-hide">
                <div className="text-center text-[10px] font-bold text-theme-muted uppercase tracking-[0.2em] mb-4">Chat Section</div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-xl bg-university-green text-white flex items-center justify-center text-sm font-black mr-3 shrink-0 shadow-md">JD</div>
                  <div className="bg-theme-card p-4 rounded-2xl rounded-tl-none shadow-sm text-sm border border-theme-border text-theme-text transition-colors">
                    <p className="font-black text-[10px] text-university-gold uppercase tracking-widest mb-1 transition-colors">Jane Doe ({schoolId.toUpperCase()})</p>
                    Hello everyone! Excited to see all the {info.name.split(' ')[0]} alumni here.
                  </div>
                </div>
                
                <div className="flex items-start flex-row-reverse">
                  <div className="w-10 h-10 rounded-xl bg-university-gold text-university-green flex items-center justify-center text-sm font-black ml-3 shrink-0 shadow-md">ME</div>
                  <div className="bg-university-green text-white p-4 rounded-2xl rounded-tr-none shadow-xl text-sm transition-colors border-0">
                    Same here Jane! Any upcoming networking events for our school?
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-theme-card border-t border-theme-border transition-colors">
                <div className="flex items-center bg-theme-section p-1 rounded-xl border border-theme-border shadow-inner">
                  <input type="text" placeholder="Type a message..." className="flex-grow bg-transparent text-theme-text placeholder-theme-muted px-4 py-3 text-sm focus:outline-none transition-colors" />
                  <button className="bg-university-green text-white hover:text-university-gold px-6 py-3 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-university-olive transition-all transform active:scale-95 shadow-md">Send</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SchoolDashboard;
