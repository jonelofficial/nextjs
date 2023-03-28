const UserIdPage = ({ id }) => {
  return <h1>{id}</h1>;
};

export const getServerSideProps = async ({ params }) => {
  return {
    props: {
      id: `userid-${params.uid}`,
    },
  };
};

export default UserIdPage;
