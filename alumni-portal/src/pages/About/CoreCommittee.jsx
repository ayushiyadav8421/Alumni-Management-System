import React from 'react';

const CoreCommittee = () => {
  const members = [
    { 
      sNo: 1, 
      name: "Dr. Satish Anamalamudi", 
      designation: "Assistant Director – Directorate of Alumni Relations & Associate Professor - Department of Computer Science and Engineering", 
      position: "Chairperson" 
    },
    { 
      sNo: 2, 
      name: "Dr Ashok Kumar Pradhan", 
      designation: "Associate Professor - Department of Computer Science Engineering", 
      position: "Member" 
    },
    { 
      sNo: 3, 
      name: "Dr Pradyut Sanki", 
      designation: "Associate Professor - Department of Electronics and Communication Engineering", 
      position: "Member" 
    },
    { 
      sNo: 4, 
      name: "Dr Ishitha Sar", 
      designation: "Assistant Professor – Department of Management Studies", 
      position: "Member" 
    },
    { 
      sNo: 5, 
      name: "Dr Sabyasachi Chakrabortty", 
      designation: "Associate Professor - Department of Chemistry", 
      position: "Member" 
    },
    { 
      sNo: 6, 
      name: "Dr. Gangi Reddy Salla", 
      designation: "Associate Professor - Department of Physics", 
      position: "Member" 
    },
    { 
      sNo: 7, 
      name: "Dr. Revathi Balakrishnan", 
      designation: "Associate Director - Student Affairs", 
      position: "Member" 
    },
    { 
      sNo: 8, 
      name: "Mr. Laxmanan Angu Raju", 
      designation: "Assistant General Manager – Directorate of Corporate Relations & Career Services", 
      position: "Member" 
    },
    { 
      sNo: 9, 
      name: "Ms Bhavana Deepa Mani", 
      designation: "Counsellor, International Relations & Higher Studies", 
      position: "Member" 
    },
    { 
      sNo: 10, 
      name: "Dr J Vineesh Prakash", 
      designation: "Assistant Professor, Department of Economics", 
      position: "Member - Convenor" 
    },
    { 
      sNo: 11, 
      name: "Mr Nivedna Sriram", 
      designation: "AP20110010510 – B.Tech CSE", 
      position: "Student Member" 
    },
    { 
      sNo: 12, 
      name: "Mr Shiva Shankar Mutupuri", 
      designation: "AP22135010029 – PhD Scholar", 
      position: "Student Member" 
    },
    { 
      sNo: 13, 
      name: "Ms Nitya", 
      designation: "AP23110050001 – B.Tech Civil", 
      position: "Student Member" 
    },
    { 
      sNo: 14, 
      name: "Mr Naman Paricha", 
      designation: "AP24322130003 – MBA", 
      position: "Student Member" 
    },
    { 
      sNo: 15, 
      name: "Mr Raju Chaudhary", 
      designation: "AP22211270023 – B.A", 
      position: "Student Member" 
    },
    { 
      sNo: 16, 
      name: "Mr Aaditya Jain", 
      designation: "AP17110010021 – B.Tech CSE", 
      position: "Alumni Member" 
    },
    { 
      sNo: 17, 
      name: "Mr Sai Rakesh Nandipati", 
      designation: "AP18110010235 – B.Tech CSE", 
      position: "Alumni Member" 
    },
    { 
      sNo: 18, 
      name: "Ms K. Sri Ritika", 
      designation: "AP17110010011 – B.Tech CSE", 
      position: "Alumni Member" 
    },
    { 
      sNo: 19, 
      name: "Mr Gumadavelly Ramya", 
      designation: "AP17110010081 – B.Tech CSE", 
      position: "Alumni Member" 
    },
    { 
      sNo: 20, 
      name: "Mr Thatikonda Lakshman", 
      designation: "AP19211010052 – BBA", 
      position: "Alumni Member" 
    },
    { 
      sNo: 21, 
      name: "Ms Purna Chandrika", 
      designation: "AP19211080002 – B.A", 
      position: "Alumni Member" 
    }
  ];

  return (
    <div className="py-20 bg-theme-bg min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-university-gold font-black text-sm uppercase tracking-[0.2em] mb-4">Leadership & Governance</h2>
          <h1 className="text-4xl lg:text-5xl font-black text-theme-text transition-colors">
            Alumni Relations <span className="text-university-green">Core Committee</span>
          </h1>
        </div>
        
        <div className="premium-card bg-theme-card overflow-hidden shadow-2xl border border-theme-border rounded-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-university-green text-white dark:bg-university-olive">
                  <th className="px-6 py-5 font-bold uppercase tracking-wider text-xs border-r border-white/10 w-20">S.No</th>
                  <th className="px-6 py-5 font-bold uppercase tracking-wider text-xs border-r border-white/10">Name</th>
                  <th className="px-6 py-5 font-bold uppercase tracking-wider text-xs border-r border-white/10">Designation</th>
                  <th className="px-6 py-5 font-bold uppercase tracking-wider text-xs">Position</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-theme-border">
                {members.map((member, idx) => (
                  <tr key={idx} className="hover:bg-theme-section transition-colors group">
                    <td className="px-6 py-5 text-theme-muted font-medium border-r border-theme-border text-center">{member.sNo}</td>
                    <td className="px-6 py-5 text-theme-text font-bold border-r border-theme-border group-hover:text-university-gold transition-colors">{member.name}</td>
                    <td className="px-6 py-5 text-theme-muted border-r border-theme-border text-sm leading-relaxed">{member.designation}</td>
                    <td className="px-6 py-5">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        member.position === 'Chairperson' 
                          ? 'bg-university-gold/20 text-university-gold border border-university-gold/30' 
                          : 'bg-theme-section text-theme-muted border border-theme-border'
                      }`}>
                        {member.position}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoreCommittee;
