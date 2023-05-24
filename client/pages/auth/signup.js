import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import useRequest from "../../hooks/use-request";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: {
      email,
      password,
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    doRequest();
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <h1 className="mb-3">SignUp</h1>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="form-control mb-3"
          />

          <label htmlFor="password">Password</label>
          <input
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control mb-3"
          />
          <div>
            <button className="btn btn-primary mb-3 mx-1">Sign Up</button>
            <Link href="/auth/signin">
              <button className="btn btn-primary mb-3">Sign In</button>
            </Link>
          </div>
        </div>
        {errors}
      </form>
    </div>
  );
};
