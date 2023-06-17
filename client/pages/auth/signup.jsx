import { useState } from "react";
import useRequest from "@/hooks/use-request";
import Router from "next/router";

const signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [biography, setBiography] = useState("");
  const [categorie, setCategorie] = useState("");
  const [role, setRole] = useState("");

  const { doRequest, errors } = useRequest({
    // url: "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/signup",
    url: "/api/users/signup",
    // url: "https://hirafee.dev/api/users/signin",
    method: "post",
    body: {
      email,
      password,
      firstName,
      lastName,
      username,
      phoneNumber,
      location,
      biography,
      categorie,
      role,
    },
    onSuccess: () => Router.push("/"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    doRequest();
    console.log("singup form");
    // Perform sign-up logic here with all the form fields
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Username:", username);
    console.log("Phone Number:", phoneNumber);
    console.log("Location:", location);
    console.log("Biography:", biography);
    console.log("Categorie:", categorie);
    console.log("Role:", role);
  };

  return (
    <main className="py-3 flex justify-center">
      <div className="container p-6 my-10  flex flex-col items-center">
        <h1 className="text-5xl font-extrabold text-gray-700 mb-4">Sign Up</h1>
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
                type="text"
                id="firstName"
                name="firstName"
                required
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="m-4">
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="m-4">
              <input
                type="text"
                id="username"
                name="username"
                required
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="m-4">
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                required
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-2 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="m-4">
              <input
                type="text"
                id="location"
                name="location"
                required
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="m-4">
              <textarea
                id="biography"
                name="biography"
                required
                placeholder="Biography"
                value={biography}
                onChange={(e) => setBiography(e.target.value)}
                className="w-full px-4 py-2 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div className="m-4">
              <input
                type="text"
                id="categorie"
                name="categorie"
                required
                placeholder="Category"
                value={categorie}
                onChange={(e) => setCategorie(e.target.value)}
                className="w-full px-4 py-2 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="m-4">
              <select
                id="role"
                name="role"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Role</option>
                <option value="artisan">Artisan</option>
                <option value="client">Client</option>
                <option value="admin">admin</option>
              </select>
            </div>

            <div className="m-4">
              <input
                type="submit"
                value="Sign Up"
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
export default signup;
