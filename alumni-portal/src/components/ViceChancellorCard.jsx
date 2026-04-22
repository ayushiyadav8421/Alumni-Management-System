const ViceChancellorCard = () => {
  return (
    <div className="md:w-1/3 w-full max-w-sm mx-auto">
      <div className="bg-theme-card rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] border border-theme-border p-4 group relative overflow-hidden transition-all duration-300 hover:shadow-xl dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
        <div className="aspect-[4/5] overflow-hidden rounded-lg mb-4 bg-theme-section">
           <img 
             src="/vc-photo.jpg" 
             alt="Prof. Satish Kumar" 
             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
           />
        </div>
        <div className="text-center relative z-10 pt-2 pb-2">
          <h3 className="text-xl font-bold text-theme-text mb-1 transition-colors">Prof. Satish Kumar</h3>
          <p className="text-university-green dark:text-theme-text font-semibold transition-colors">Hon. Vice-Chancellor</p>
          <p className="text-sm text-theme-muted mt-1 transition-colors">SRM University AP</p>
        </div>
      </div>
    </div>
  );
};

export default ViceChancellorCard;
