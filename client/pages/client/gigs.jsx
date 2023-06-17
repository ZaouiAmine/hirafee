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
        setData(response.data); // Assuming the response data is what you want to set in the state
        console.log(response.data);
      } catch (error) {
        // Handle any errors that occur during the API request
        console.error(error);
      }
    };

    fetchData(); // Call the async function to fetch data
  }, [count]);
  return (
    <main className="flex justify-center">
      <div className="container min-h-screen flex flex-col items-center ">
        <div className="w-full h-full sm:w-2/3 md:w-3/5 lg:w-3/5 xl:w-2/5">
          <h1 className="text-gray-500 font-bold m-5 text-xxl">Categories</h1>
          <div className="w-full border rounded-md hover:shadow-md m-4">
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <div className="my-4 ml-4 mr-2 w-full">
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="my-4 ml-4 mr-2 w-full">
                <input
                  type="text"
                  id="description"
                  name="description"
                  required
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="my-4 ml-4 mr-2 w-full">
                <input
                  type="number"
                  id="budget"
                  name="budget"
                  required
                  placeholder="Budget"
                  value={budget}
                  onChange={(e) => setBudget(parseFloat(e.target.value))}
                  className="w-full px-4 py-2 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="my-4 ml-4 mr-2 w-full">
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

              <div className="my-4 ml-4 mr-2 w-full">
                <input
                  type="text"
                  id="category"
                  name="category"
                  required
                  placeholder="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="my-4 ml-4 mr-2 w-full">
                <input
                  type="text"
                  id="requirements"
                  name="requirements"
                  required
                  placeholder="Requirements"
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  className="w-full px-4 py-2 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="my-4 mr-4 ml-2 w-full">
                <input
                  type="submit"
                  value="Add"
                  className="w-full hover:cursor-pointer text-center px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
                />
              </div>
            </form>
            {addErrors}
          </div>

          {data != null &&
            data.map((gig) => {
              return (
                <div
                  key={gig.id}
                  className="w-full border rounded-md hover:shadow-md m-4 "
                >
                  <form
                    className="flex items-center"
                    onSubmit={(e) => handleDelete(e, gig.id)}
                  >
                    <h1 className="text-gray-500 my-4 ml-4 mr-2 w-5/6">
                      <span className="font-bold text-gray-900">
                        {gig.name}{" "}
                      </span>
                      gig
                    </h1>
                    <div className="my-4 mr-4 ml-2 w-1/6">
                      <input
                        type="submit"
                        value="Delete"
                        className="w-full hover:cursor-pointer text-center px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                      />
                    </div>
                  </form>
                </div>
              );
            })}
        </div>
      </div>
    </main>
  );
};
export default gigs;
