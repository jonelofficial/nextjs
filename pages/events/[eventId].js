import EventContent from "@/components/event-detail/event-content";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventSummary from "@/components/event-detail/event-summary";
import ErrorAlert from "@/components/ui/error-alert";
import Head from "next/head";
import { Fragment } from "react";

const EventDetailPage = ({ event }) => {
  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }
  return (
    <Fragment>
      <Head>
        <title>{event?.title}</title>
        <meta name="description" content="testing meta tag on AllEventsPage" />
      </Head>
      <EventSummary title={event?.title} />
      <EventLogistics
        date={event?.date}
        address={event?.location}
        image={event?.image}
        imageAlt={event?.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
};

export const getStaticProps = async ({ params }) => {
  const res = await fetch(
    "https://nextjs-c0dc1-default-rtdb.firebaseio.com/events.json"
  );

  const jsonData = await res.json();

  const data = jsonData[params.eventId];

  if (!data) {
    return { props: { event: null } };
  }

  return { props: { event: data }, revalidate: 30 };
};

export const getStaticPaths = async () => {
  const res = await fetch(
    "https://nextjs-c0dc1-default-rtdb.firebaseio.com/events.json"
  );

  const jsonData = await res.json();

  const transformedData = Object.keys(jsonData).map((key) => ({
    id: key,
    ...jsonData[key],
  }));

  const ids = transformedData.map((data) => ({ params: { eventId: data.id } }));

  return {
    paths: ids,
    fallback: false, // false because all id is updated from server , "blocking" if you want to wait the data before rendering
  };
};

export default EventDetailPage;
