import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, GraduationCap, Building2, Award } from 'lucide-react';
import slider1 from '../assets/slider1.jpg';
import slider2 from '../assets/slider2.png';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: slider1,
      title: "Pride of the Nation",
      subtitle: "Empowering the next generation of leaders.",
      icon: <GraduationCap size={48} className="text-university-gold mb-6" />
    },
    {
      image: slider2,
      title: "Our Vibrant Campus", 
      subtitle: "Where memories were made and futures were forged.",
      icon: <Building2 size={48} className="text-university-gold mb-6" />
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative h-[600px] md:h-[700px] w-full overflow-hidden bg-theme-bg">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-all duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105'
          }`}
        >
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] ease-linear"
            style={{ 
              backgroundImage: `url(${slide.image})`,
              transform: index === currentSlide ? 'scale(1.1)' : 'scale(1)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80 dark:from-black/90 dark:via-black/60 dark:to-black/90"></div>
          </div>
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20">
             <div className={`transform transition-all duration-1000 delay-300 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                {slide.icon}
                <h1 className="text-5xl md:text-6xl lg:text-8xl font-black text-white mb-6 drop-shadow-2xl tracking-tight">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-3xl text-gray-200 drop-shadow-lg font-medium max-w-3xl mx-auto border-t border-university-gold/30 pt-6">
                  {slide.subtitle}
                </p>
                <div className="mt-12 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center">
                   <Link to="/register" className="bg-university-gold text-university-green font-extrabold px-10 py-4 rounded-full hover:bg-yellow-500 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 inline-block">
                      JOIN THE NETWORK
                   </Link>
                   <Link to="/events" className="bg-transparent border-2 border-white text-white font-bold px-10 py-4 rounded-full hover:bg-white hover:text-black transition-all shadow-xl backdrop-blur-sm inline-block">
                      EXPLORE EVENTS
                   </Link>
                </div>
             </div>
          </div>
        </div>
      ))}

      {/* Navigation Controls */}
      <button 
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-3 bg-black/20 hover:bg-university-gold text-white hover:text-theme-bg rounded-full transition-all backdrop-blur-md border border-white/10"
        aria-label="Previous slide"
      >
        <ChevronLeft size={36} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-3 bg-black/20 hover:bg-university-gold text-white hover:text-theme-bg rounded-full transition-all backdrop-blur-md border border-white/10"
        aria-label="Next slide"
      >
        <ChevronRight size={36} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex space-x-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-500 rounded-full h-1.5 ${
              index === currentSlide ? 'bg-university-gold w-16 shadow-lg shadow-university-gold/50' : 'bg-white/30 w-8 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
