import { useRouter } from "next/router";
import Link from "next/link";

const ClientsProjecstPage = () => {
  const router = useRouter();

  console.log(router.query);

  const loadProjectHandler = () => {
    router.push({
      pathname: "/clients/[id]/[clientprojectid]",
      query: {
        id: router.query?.id,
        clientprojectid: "project-1",
      },
    });
  };

  return (
    <div>
      <h1>Clients Project Page {router.query?.id}</h1>
      <button onClick={loadProjectHandler}>Load Project</button>
      {/* <ul>
        <li>
          <Link href={`/clients/${router.query?.id}/project-1`}>Project 1</Link>
        </li>
      </ul> */}
    </div>
  );
};

export default ClientsProjecstPage;
