import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import useSWR from "swr";
const FilteredEventsPage = ({
  numMonth,
  numYear,
  filteredEvents: initialData,
  isError,
}) => {
  const [filteredEvents, setFilteredEvents] = useState(initialData);
  const router = useRouter();

  const filteredData = router.query.slug;

  const { data, error } = useSWR(
    "https://nextjs-c0dc1-default-rtdb.firebaseio.com/events.json"
  );

  useEffect(() => {
    console.log("DATA: ", data);
    return () => {
      null;
    };
  }, [data]);

  if (!filteredData && !data) {
    return <p className="center">Loading...</p>;
  }

  if (isError) {
    return (
      <div style={{ padding: "2rem" }}>
        <ErrorAlert>
          <p className="center" style={{ marginBottom: "10px" }}>
            Invalid validation
          </p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </div>
    );
  }

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <div style={{ padding: "2rem" }}>
        <ErrorAlert>
          <p className="center" style={{ marginBottom: "10px" }}>
            No Content Found!
          </p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </div>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
};

export const getServerSideProps = async ({ params }) => {
  const filteredYear = params.slug[0];
  const filteredMonth = params.slug[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    params.slug.length > 2 ||
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: { isError: true },
      // redirect: {
      //   destination: "/test-error",
      // },
    };
  }

  const res = await fetch(
    "https://nextjs-c0dc1-default-rtdb.firebaseio.com/events.json"
  );

  const jsonData = await res.json();

  const transformedData = Object.keys(jsonData).map((key) => ({
    id: key,
    ...jsonData[key],
  }));

  const data = transformedData.filter((e) => {
    const eventDate = new Date(e.date);

    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  return {
    props: {
      numYear: numYear,
      numMonth: numMonth,
      filteredEvents: data,
    },
  };
};
export default FilteredEventsPage;
