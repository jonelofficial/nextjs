import { useRouter } from "next/router";

const ClientsProjectPage = () => {
  const router = useRouter();

  console.log(router.query);

  return (
    <div>
      <h1>Clients Project Page {router.query?.id}</h1>
    </div>
  );
};

export default ClientsProjectPage;
