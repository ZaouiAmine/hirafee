import { useState } from "react";
import Link from "next/link";
import axios from "axios";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [statusCode, setStatusCode] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("/api/users/signin", {
        email,
        password,
      })
      .then(function (response) {
        if (response.status == 200) {
          setStatusCode(200);
        }
      })
      .catch(function (error) {
        if (error.response.status == 400) {
          setStatusCode(400);
        }
        console.log(error);
        setErrors(error.response.data.errors);
      });
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <h1 className="mb-3">SignIn</h1>
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
            <button className="btn btn-primary mb-3 mx-1">Sign In</button>
            <Link href="/auth/signup">
              <button className="btn btn-primary mb-3">Sign Up</button>
            </Link>
          </div>
          {errors.length > 0 && (
            <div className="alert alert-danger mb-3 mx-1">
              <h4>Ooops ....</h4>
              <ul>
                {errors.map((err) => (
                  <li key={err.message}>{err.message}</li>
                ))}
              </ul>
            </div>
          )}
          {statusCode == 200 && (
            <div className="alert alert-success mb-3 mx-1">
              <h4>SignIn successful</h4>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
