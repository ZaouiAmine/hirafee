import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  console.log("current user session ", currentUser);
  return currentUser ? <h1>signed in </h1> : <h1>not signed in</h1>;
};

LandingPage.getInitialProps = async (context) => {
  const { data } = await buildClient(context).get("/api/users/currentuser");
  return data;
};

export default LandingPage;
