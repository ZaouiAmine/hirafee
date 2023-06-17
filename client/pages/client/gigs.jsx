import { useState, useEffect } from "react";
import useRequest from "@/hooks/use-request";
import axios from "axios";

const gigs = ({ currentUser }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState(0);
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [requirements, setRequirements] = useState("");

  const [count, setCount] = useState(1);
  const [data, setData] = useState(null);

  const { doRequest: addGig, errors: addErrors } = useRequest({
    url: "/api/gigs",
    method: "post",
    body: {
      title,
      description,
      budget,
      location,
      clientId: currentUser.id,
      category,
      requirements,
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addGig();
    setCount((prev) => prev + 1);

    console.log(title);
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    await axios.delete(`/api/gigs/${id}`);
    setCount((prev) => prev + 1);
    console.log(id);
  };

  useEffect(() => {
    console.log("use effect");
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/gigs");
        const filteredData = response.data.filter(
          (gig) => gig.clientId === currentUser.id
        );
        setData(filteredData);
        console.log(filteredData);
      } catch (error) {
        // Handle any errors that occur during the API request
        console.error(error);
      }
    };

    fetchData(); // Call the async function to fetch data
  }, [count]);
  return (
    <main className="min-h-screen flex justify-center">
      <div className="container flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-500 m-4">Own Gigs</h1>
        <div className="w-full flex gap-2 justify-center  items-start flex-wrap">
          <div className="w-136 p-4 rounded-lg border ">
            <h1 className="text-xl font-bold text-gray-500 m-2">Add a Gig</h1>
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
              <div className="">
                <input
                  type="text"
                  className="w-full  p-2  placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="title"
                  name="title"
                  required
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="">
                <input
                  type="text"
                  className="w-full  p-2  placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="description"
                  name="description"
                  required
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="">
                <input
                  type="number"
                  className="w-full  p-2  placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="budget"
                  name="budget"
                  required
                  placeholder="Budget"
                  value={budget}
                  onChange={(e) => setBudget(parseFloat(e.target.value))}
                />
              </div>
              <div className="">
                <input
                  type="text"
                  className="w-full  p-2  placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="location"
                  name="location"
                  required
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="">
                <input
                  type="text"
                  className="w-full  p-2  placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="category"
                  name="category"
                  required
                  placeholder="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="">
                <textarea
                  type="text"
                  className="w-full  p-2  placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="requirements"
                  name="requirements"
                  required
                  placeholder="Requirements"
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                />
              </div>
              <div className="w-full flex justify-end ">
                <input
                  type="submit"
                  value="Add Gig"
                  className="w-32 p-2  bg-green-500 text-white hover:bg-green-600 text-center  border rounded-lg  cursor-pointer"
                />
              </div>
            </form>
            {addErrors}
          </div>

          <div className="w-136 p-4 rounded-lg border flex flex-col gap-4 ">
            <h1 className="text-xl font-bold text-gray-500 m-2">Gig's List</h1>
            {data != null &&
              data.map((gig) => {
                return (
                  <div
                    key={gig.id}
                    className="border border-gray-300 rounded-lg"
                  >
                    <form
                      className="p-4 flex flex-col gap-4"
                      onSubmit={(e) => handleDelete(e, gig.id)}
                    >
                      <h1 className="text-2xl">
                        <span className="text-gray-500 font-bold">
                          {gig.title}
                        </span>
                      </h1>
                      <p className="text-gray-500">
                        <span className="font-bold">Description: </span>
                        {gig.description}
                      </p>
                      <p className="text-gray-500">
                        <span className="font-bold">Category: </span>
                        {gig.category}
                      </p>
                      <p className="text-gray-500">
                        <span className="font-bold">Budget: </span>
                        {gig.budget}
                      </p>
                      <p className="text-gray-500">
                        <span className="font-bold">Location: </span>
                        {gig.location}
                      </p>
                      <p className="text-gray-500">
                        <span className="font-bold">Requirements: </span>
                        {gig.requirements}
                      </p>
                      <div className="w-full flex justify-end">
                        <input
                          type="submit"
                          value="Delete"
                          className="w-32 p-2 bg-red-500 text-white hover:bg-red-600 text-center border rounded-lg cursor-pointer"
                        />
                      </div>
                    </form>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </main>
  );
};
export default gigs;
