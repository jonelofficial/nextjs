import EventList from "@/components/events/event-list";
import EventsSearch from "@/components/events/events-search";
import { useRouter } from "next/router";

const AllEventsPage = ({ events }) => {
  const router = useRouter();
  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };
  return (
    <div>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </div>
  );
};

export const getStaticProps = async () => {
  const res = await fetch(
    "https://nextjs-c0dc1-default-rtdb.firebaseio.com/events.json"
  );

  const jsonData = await res.json();

  const tranformedData = Object.keys(jsonData).map((key) => ({
    id: key,
    title: jsonData[key].title,
    date: jsonData[key].date,
    description: jsonData[key].description,
    image: jsonData[key].image,
    isFeatured: jsonData[key].isFeatured,
    location: jsonData[key].location,
  }));

  return {
    props: { events: tranformedData },
  };
};

export default AllEventsPage;
