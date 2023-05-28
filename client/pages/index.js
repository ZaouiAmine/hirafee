const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  return <h1>Landing Page</h1>;
};

LandingPage.getInitialProps = async () => {
  if (typeof windows === "undefined") {
  } else {
    const { data } = await axios.get("/api/users/currentuser");
    return data;
  }
  return {};
};

export default LandingPage;
