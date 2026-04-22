import React from 'react';

const MessageAD = () => {
  return (
    <div className="py-20 bg-theme-bg transition-colors duration-300 min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Text Content - Left Side */}
          <div className="lg:w-2/3 order-2 lg:order-1">
            <h2 className="text-university-gold font-black text-sm uppercase tracking-[0.2em] mb-4">Directorate of Alumni Relations</h2>
            <h1 className="text-4xl lg:text-5xl font-black text-theme-text mb-8 leading-tight transition-colors">
              Message from the <span className="text-university-green">Assistant Director</span>
            </h1>
            
            <div className="space-y-6 text-lg text-theme-muted leading-relaxed transition-colors">
              <p>
                Dear Alumni, It gives me immense pleasure to reach out to you through our dedicated Alumni Portal. Our alumni are the pride of SRM University AP, and your success is a testament to the quality of education and values we strive to impart.
              </p>
              <p>
                The Directorate of Alumni Relations is committed to fostering a lifelong connection between the university and its graduates. We aim to create a vibrant platform where you can engage with your alma mater, mentor current students, and collaborate with your peers globally.
              </p>
              <p>
                I invite you to stay connected, share your achievements, and contribute to the growth of our university. Together, we can build a strong and supportive SRM AP alumni community.
              </p>
            </div>
            
            <div className="mt-12 pt-8 border-t border-theme-border">
              <h3 className="text-2xl font-bold text-theme-text transition-colors">Dr. Satish Anamalamudi</h3>
              <p className="text-university-green font-bold flex flex-col mt-2">
                <span className="text-sm uppercase tracking-wider">Assistant Director | Alumni Relations</span>
                <span className="text-sm font-medium text-theme-muted">Associate Professor, Department of CSE</span>
                <span className="text-sm font-medium text-theme-muted">SRM University AP</span>
              </p>
            </div>
          </div>
          
          {/* Image - Right Side */}
          <div className="lg:w-1/3 order-1 lg:order-2">
            <div className="relative group">
              <div className="absolute -inset-4 bg-university-gold/20 rounded-2xl blur-xl group-hover:bg-university-gold/30 transition-all duration-500"></div>
              <div className="relative premium-card p-2 rounded-2xl overflow-hidden aspect-square border-2 border-university-gold/30">
                <img 
                  src="/images/satish_profile.png" 
                  alt="Dr. Satish Anamalamudi" 
                  className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageAD;
