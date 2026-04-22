import ViceChancellorPreview from './ViceChancellorPreview';
import ViceChancellorCard from './ViceChancellorCard';

const ViceChancellorMessage = () => {
  return (
    <section className="py-20 bg-theme-bg transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <ViceChancellorPreview />
          <ViceChancellorCard />
        </div>
      </div>
    </section>
  );
};

export default ViceChancellorMessage;
