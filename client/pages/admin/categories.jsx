import { useState, useEffect } from "react";
import useRequest from "@/hooks/use-request";
import axios from "axios";

const categories = () => {
  const [catName, setCatName] = useState("");
  const [count, setCount] = useState(1);
  const [data, setData] = useState(null);

  const { doRequest: addCat, errors: addErrors } = useRequest({
    url: "/api/categories",
    method: "post",
    body: {
      name: catName,
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addCat();
    setCount((prev) => prev + 1);
    setCatName("");
    console.log(catName);
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    await axios.delete(`/api/categories/${id}`);
    setCount((prev) => prev + 1);
    console.log(id);
  };

  useEffect(() => {
    console.log("use effect");
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/categories");
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
            <form className="flex" onSubmit={handleSubmit}>
              <div className="my-4 ml-4 mr-2 w-5/6">
                <input
                  type="text"
                  id="cat"
                  name="cat"
                  required
                  placeholder="New categorie name"
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  className="w-full px-4 py-2 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="my-4 mr-4 ml-2 w-1/6">
                <input
                  type="submit"
                  value="Add"
                  className="w-full hover:cursor-pointer text-center px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
                />
              </div>
            </form>
          </div>

          {data != null &&
            data.map((cat) => {
              return (
                <div
                  key={cat.id}
                  className="w-full border rounded-md hover:shadow-md m-4 "
                >
                  <form
                    className="flex items-center"
                    onSubmit={(e) => handleDelete(e, cat.id)}
                  >
                    <h1 className="text-gray-500 my-4 ml-4 mr-2 w-5/6">
                      <span className="font-bold text-gray-900">
                        {cat.name}{" "}
                      </span>
                      category
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
export default categories;
