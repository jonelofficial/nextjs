import { useRouter } from "next/router";

const EventDetailPage = () => {
  const router = useRouter();

  console.log(router.query);
  return <div>EventDetailPage</div>;
};

export default EventDetailPage;
