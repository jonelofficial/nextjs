import { useRouter } from "next/router";

const FilteredEventsPage = () => {
  const router = useRouter();

  console.log(router.query);
  return <div>FilteredEventsPage</div>;
};

export default FilteredEventsPage;
