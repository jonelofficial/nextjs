import EventList from "@/components/events/event-list";
import { getFeaturedEvents } from "@/dummy-data";

const HomePage = () => {
  const featuredEvents = getFeaturedEvents();
  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
};

export const getServerSideProps = async () => {
  const res = await fetch(
    "https://nextjs-c0dc1-default-rtdb.firebaseio.com/events",
    { method: "GET" }
  );

  const jsonData = await res.json();

  console.log("data: ", jsonData);

  return {
    props: {},
  };
};

export default HomePage;
