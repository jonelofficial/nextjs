import EventList from "@/components/events/event-list";
import { getFeaturedEvents } from "@/dummy-data";

const HomePage = () => {
  const featuredEvents = getFeaturedEvents();
  console.log("test");
  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
};

export default HomePage;
