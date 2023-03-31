import EventList from "@/components/events/event-list";
import Head from "next/head";

const HomePage = ({ items }) => {
  return (
    <div>
      <Head>
        <title>NextJs Events</title>
        <meta name="description" content="testing meta tag on HomePage" />
      </Head>
      <EventList items={items} />
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

  const filteredData = tranformedData.filter((e) => e.isFeatured);

  return {
    props: { items: filteredData },
    revalidate: 1800,
  };
};

export default HomePage;
