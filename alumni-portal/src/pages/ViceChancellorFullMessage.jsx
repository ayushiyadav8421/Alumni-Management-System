import { useEffect } from 'react';

const ViceChancellorFullMessage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Message from Pro-Chancellor's - SRM AP Alumni";
  }, []);

  return (
    <div className="min-h-screen bg-theme-section py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="container mx-auto max-w-4xl">
        
        {/* Breadcrumb / Back Navigation */}
        <div className="mb-8">
          <button 
            onClick={() => window.history.back()}
            className="text-university-green dark:text-theme-text hover:text-university-gold dark:hover:text-university-gold font-medium flex items-center transition-colors"
          >
            &larr; Back to Home
          </button>
        </div>

        {/* Centered Card Layout */}
        <div className="bg-theme-card rounded-2xl shadow-xl overflow-hidden border border-theme-border transition-colors duration-300">
          
          {/* Header Banner */}
          <div className="bg-university-green px-8 py-10 text-center relative overflow-hidden">
             <div className="absolute inset-0 bg-university-green opacity-90"></div>
             {/* Decorative element */}
             <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-white opacity-5 rounded-full"></div>
             <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-48 h-48 bg-university-gold opacity-10 rounded-full"></div>
             
             <div className="relative z-10 flex flex-col items-center">
               <div className="w-24 h-24 bg-white rounded-full p-1 mb-6 shadow-md hidden sm:block">
                 <img 
                   src="/vc-photo.jpg" 
                   alt="Vice Chancellor" 
                   className="w-full h-full object-cover rounded-full"
                 />
               </div>
               <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 text-shadow-sm">Message for Alumni</h1>
               <div className="w-24 h-1 bg-university-gold mt-4 mx-auto rounded"></div>
             </div>
          </div>

          {/* Full Message Body */}
          <div className="p-8 md:p-12 lg:p-16">
            <div className="prose prose-lg md:prose-xl max-w-none text-theme-text space-y-8 font-serif leading-relaxed transition-colors duration-300">
              <p>
                The Alumni network of any institution reflects the institution's achievements, its values and what the institution truly represents. In the words of Tim McGraw: <span className="italic text-university-gold">"We all take different paths in life, but no matter where we go, we take a little of each other everywhere,"</span> and I am sure you all carry a little of SRM's legacy and pride, the memories you created here, the friendships you made, and the values you built here and no matter where you go we are proud of the impact you make in your diverse fields and the world around you.
              </p>
              
              <p>
                Your time at this institution was a determining chapter in your life. You are today our brand ambassadors, each of you are a living legacy of the institution called SRM AP and your achievements are our testimony of excellence. When you first stepped outside this chapter of your life, you must have heard people tell you WORK HARD, GET A SECURE JOB, BE SUCCESSFUL, but dear Alumni, let me remind you, there is a profound difference between success and passion. Success is only the by-product of passion. Your passion is your energy, and nothing great can be accomplished unless you are passionate about it. I encourage each one of you to find your passion, connect with like-minded people and other members of the Alumni community. Together, we can build a network that not just inspires and uplifts but also draws you closer to your dreams and passions.
              </p>
              
              <p>
                Let us together chase the passionate fire within us, and forge connections that will help fellow Alumni discover their passion and carry forward the grand legacy that is SRM University-AP.
              </p>
              
              <p>
                Wishing you all continued success and the courage to embark on your unique journeys.
              </p>

              <div className="mt-12 pt-8 border-t border-theme-border flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 transition-colors">
                <div className="text-center sm:text-left">
                  <h4 className="font-bold text-theme-text text-xl font-sans">Prof. Satish Kumar</h4>
                  <p className="text-university-green dark:text-theme-muted font-semibold font-sans mt-0.5">Hon. Vice-Chancellor</p>
                  <p className="text-theme-muted text-sm font-sans mt-1">SRM University AP</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ViceChancellorFullMessage;
