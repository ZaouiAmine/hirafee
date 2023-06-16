import { useState } from "react";
import useRequest from "@/hooks/use-request";
import Router from "next/router";

const signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { doRequest, errors } = useRequest({
    url: "/api/users/signin",

    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push("/"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    doRequest();
    console.log("signin form");
    // Perform sign-in logic here with email and password
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <main className="min-h-screen flex justify-center">
      <div className="container p-6 mt-60 flex flex-col items-center">
        <h1 className="text-5xl font-extrabold text-gray-700 mb-12">Sign In</h1>
        <div className="w-full md:w-4/5 lg:w-3/5 xl:w-2/5 ">
          <form onSubmit={handleSubmit}>
            <div className="m-4">
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="m-4">
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="m-4">
              <input
                type="submit"
                value="Sign In"
                className="w-full px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
              />
            </div>
          </form>
          {errors}
        </div>
      </div>
    </main>
  );
};
export default signin;
