import { useState, useEffect } from "react";
import axios from "axios";

const gigs = ({ currentUser }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/gigs");
        console.log(response);
        const filteredData = response.data.filter(
          (gig) => gig.category === currentUser.categorie
        );
        setData(filteredData);
        console.log(filteredData);
        console.log(currentUser);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="min-h-screen flex justify-center">
      <div className="container flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-500 m-4">Gig's List</h1>
        <div className=" p-4 rounded-lg border flex flex-col gap-4">
          {data != null &&
            data.map((gig) => (
              <div key={gig.id} className="border border-gray-300 rounded-lg">
                <div className="w-136 p-4 flex flex-col gap-4">
                  <h1 className="text-2xl">
                    <span className="text-gray-500 font-bold">{gig.title}</span>
                  </h1>
                  <p className="text-gray-500">
                    <span className="font-bold">Description: </span>
                    {gig.description}
                  </p>
                  <p className="text-gray-500">
                    <span className="font-bold">categorie: </span>
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
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
};

export default gigs;
