import { Calendar, MapPin, Clock, ExternalLink } from 'lucide-react';

const EventsSection = () => {
  const events = [
    {
      id: 1,
      title: "Global Alumni Meet 2026",
      type: "Reunion",
      date: "Oct 15, 2026",
      time: "10:00 AM - 4:00 PM",
      location: "SRM AP Campus, Main Plaza",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop",
      description: "A grand celebration of our alumni legacy. Revisit the campus, meet your old professors, and share your success stories.",
      isPast: false
    },
    {
      id: 2,
      title: "Future of AI in Industry",
      type: "Webinar",
      date: "Nov 12, 2026",
      time: "4:00 PM - 5:30 PM",
      location: "Zoom / MS Teams",
      image: "https://images.unsplash.com/photo-1591115765373-520b7a217287?q=80&w=2070&auto=format&fit=crop",
      description: "Join our distinguished alumni working in tech giants to discuss how AI is reshaping the engineering landscape.",
      isPast: false
    },
    {
      id: 3,
      title: "Career Mentoring: Engineering",
      type: "Campus Event",
      date: "Dec 05, 2026",
      time: "9:00 AM - 1:00 PM",
      location: "SEAS Seminar Hall",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop",
      description: "An exclusive session for final year students to interact with alumni from diverse engineering domains.",
      isPast: false
    }
  ];

  return (
    <section className="py-24 bg-theme-bg transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-black text-theme-text mb-4 inline-block relative border-b-8 border-university-gold/40 pb-2 transition-colors">
              Upcoming Events
            </h2>
            <p className="text-theme-muted text-lg mt-4 transition-colors">Join industry sessions, career webinars, and alumni reunions.</p>
          </div>
          <a href="#" className="inline-flex text-university-green font-bold hover:text-university-gold dark:text-university-gold dark:hover:text-white transition-all items-center bg-theme-section px-6 py-3 rounded-full border border-theme-border shadow-sm hover:shadow-md">
            View All Calendar <ExternalLink size={18} className="ml-2" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {events.map(event => (
            <div key={event.id} className="premium-card flex flex-col h-full group bg-theme-card border border-theme-border hover:border-university-gold/50 transition-all duration-500 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out"
                />
                <div className="absolute top-4 right-4 z-20">
                   <span className={`px-4 py-1.5 rounded-full font-extrabold text-xs uppercase tracking-widest shadow-lg ${
                     event.type === 'Webinar' ? 'bg-blue-600 text-white' : 
                     event.type === 'Reunion' ? 'bg-university-gold text-university-green' : 
                     'bg-university-green text-white'
                   }`}>
                     {event.type}
                   </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center text-xs font-bold text-university-green dark:text-university-gold mb-4 space-x-4 tracking-wider transition-colors">
                  <span className="flex items-center"><Calendar size={16} className="mr-2" /> {event.date}</span>
                  <span className="flex items-center"><Clock size={16} className="mr-2" /> {event.time}</span>
                </div>
                
                <h3 className="text-2xl font-black text-theme-text mb-4 group-hover:text-university-gold transition-colors line-clamp-2 leading-tight">
                  {event.title}
                </h3>
                
                <p className="text-theme-muted text-sm mb-6 flex-grow leading-relaxed line-clamp-3 transition-colors">
                  {event.description}
                </p>
                
                <div className="flex items-center text-sm font-semibold text-theme-text mb-8 transition-colors p-3 bg-theme-section rounded-lg border border-theme-border/50">
                  <MapPin size={18} className="text-university-gold mr-3 shrink-0" />
                  <span className="truncate">{event.location}</span>
                </div>
                
                <div className="mt-auto">
                  <button 
                    disabled={event.isPast}
                    className="w-full py-4 rounded-xl font-black text-sm tracking-widest uppercase transition-all bg-university-green text-white hover:bg-university-olive hover:shadow-[0_8px_30px_rgba(47,62,47,0.3)] active:scale-95"
                  >
                    {event.type === 'Webinar' ? 'Register Online' : 'RSVP Now'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
