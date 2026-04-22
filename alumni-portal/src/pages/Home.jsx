import Hero from '../components/Hero';
import ViceChancellorMessage from '../components/ViceChancellorMessage';
import SchoolButtons from '../components/SchoolButtons';
import EventsSection from '../components/EventsSection';
import AchieversSection from '../components/AchieversSection';

const Home = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <Hero />
      <ViceChancellorMessage />
      <SchoolButtons />
      <EventsSection />
      <AchieversSection />
    </div>
  );
};

export default Home;
