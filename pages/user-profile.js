import { Fragment } from "react";

const UserProfilePage = ({ username }) => {
  return (
    <Fragment>
      <h1>{username}</h1>
    </Fragment>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  console.log("RES: ", res);
  return { props: { username: "Jonel" } };
};

export default UserProfilePage;
