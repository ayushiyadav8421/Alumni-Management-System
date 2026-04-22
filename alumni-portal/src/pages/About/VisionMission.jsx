import React from 'react';

const VisionMission = () => {
  return (
    <div className="py-16 bg-theme-bg min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="premium-card bg-theme-card p-8 md:p-12 mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-university-green dark:text-theme-text mb-8 border-l-4 border-university-gold pl-4 transition-colors">
            Vision
          </h1>
          <p className="text-xl text-theme-muted leading-relaxed transition-colors">
            To provide a world-class networking platform that seamlessly connects our global alumni, current students, and faculty, fostering a culture of lifelong learning, collaboration, and mutual growth.
          </p>
        </div>

        <div className="premium-card bg-theme-card p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-university-green dark:text-theme-text mb-8 border-l-4 border-university-gold pl-4 transition-colors">
            Mission
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Build a strong and engaged global alumni network.",
              "Support career growth through networking and job opportunities.",
              "Encourage mentoring programs for current students.",
              "Organize impactful alumni reunions and campus events.",
              "Support research collaboration and industry sessions.",
              "Promote the university's mission and values globally."
            ].map((item, index) => (
              <li key={index} className="flex items-start space-x-4 p-4 bg-theme-section rounded-xl border border-theme-border transition-all hover:shadow-md group">
                <div className="w-6 h-6 rounded-full bg-university-gold text-white flex items-center justify-center font-bold text-xs shrink-0 mt-1 group-hover:scale-110 transition-transform">
                  {index + 1}
                </div>
                <span className="text-theme-text transition-colors">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VisionMission;
