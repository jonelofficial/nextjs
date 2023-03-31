import EventList from "@/components/events/event-list";
import EventsSearch from "@/components/events/events-search";
import Head from "next/head";
import { useRouter } from "next/router";

const AllEventsPage = ({ events }) => {
  const router = useRouter();
  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };
  return (
    <div>
      <Head>
        <title>All Events</title>
        <meta name="description" content="testing meta tag on AllEventsPage" />
      </Head>
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
    ...jsonData[key],
  }));

  return {
    props: { events: tranformedData },
    revalidate: 60,
  };
};

export default AllEventsPage;
