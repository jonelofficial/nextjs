import EventList from "@/components/events/event-list";

const HomePage = ({ items }) => {
  return (
    <div>
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
    title: jsonData[key].title,
    date: jsonData[key].date,
    description: jsonData[key].description,
    image: jsonData[key].image,
    isFeatured: jsonData[key].isFeatured,
    location: jsonData[key].location,
  }));

  const filteredData = tranformedData.filter((e) => e.isFeatured);

  return {
    props: { items: filteredData },
  };
};

export default HomePage;
