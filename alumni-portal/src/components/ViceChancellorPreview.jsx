import { Link } from 'react-router-dom';

const ViceChancellorPreview = () => {
  return (
    <div className="md:w-2/3">
      <h2 className="text-3xl md:text-4xl font-bold text-university-green dark:text-theme-text mb-6 border-l-4 border-university-gold pl-4 transition-colors">
        A Warm Welcome to All Our Alumni!
      </h2>
      <div className="prose prose-lg text-theme-muted space-y-4">
        <p className="leading-relaxed">
          The alumni network of any institution reflects the institution's achievements, its values, and what it truly represents. In the words of Tim McGraw: "We all take different paths in life, but no matter where we go, we take a little of each other everywhere."
        </p>
        <p className="leading-relaxed">
          I am sure you all carry a little of SRM's legacy and pride — the memories you created here, the friendships you made, and the values you built. No matter where you go, we are proud of the impact you make in your diverse fields and the world around you.
        </p>
        
        <div className="mt-8 pt-4">
          <Link 
            to="/message-from-vice-chancellor" 
            className="inline-flex items-center font-semibold text-university-green dark:text-university-gold hover:text-university-gold dark:hover:text-white transition-colors text-lg"
          >
            Read Full Message &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViceChancellorPreview;
