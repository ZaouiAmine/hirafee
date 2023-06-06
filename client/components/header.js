import Link from "next/link";
import Image from "next/image";

export default ({ currentUser }) => {
  const links = [
    !currentUser && { label: "Sign up", href: "/auth/signup" },
    !currentUser && { label: "Sign in", href: "/auth/signin" },
    currentUser && { label: "Sign out", href: "/auth/signout" },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href}>
          <Link className="nav-link" href={href}>
            {label}
          </Link>
        </li>
      );
    });

  return (
    // <nav className="navbar navbar-light bg-light px-4">
    //   <Link className="navbar-brand" href="/">
    //     hirafee
    //   </Link>
    //   <div className="d-flex justify-content-end">
    //     <ul className="nav d-flex align-items-center">{links}</ul>
    //   </div>
    // </nav>
    <>
      <nav className="navbar navbar-expand-md navbar-light bg-white border-bottom border-gray">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src="/images/logo.png" alt="Logo" width="30" />
          </a>
          <button
            className="navbar-toggler .navbar-toggler:focus {
              outline: none;
              box-shadow: none;
            }"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link  active" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="#">
                  Find Craftsman
                </a>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link" href="#">
                  Link 3
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link 4
                </a>
              </li> */}
            </ul>
            <div className="d-flex">
              <button className="btn btn-success me-2 rounded-5" type="button">
                Login
              </button>
              <button
                className="btn btn-outline-success me-2 rounded-5"
                type="button"
              >
                Join Now
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
