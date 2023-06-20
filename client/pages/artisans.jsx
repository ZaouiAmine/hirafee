import React, { useEffect, useState } from "react";
import axios from "axios";

const Artisans = () => {
  const [artisans, setArtisans] = useState([]);

  useEffect(() => {
    fetchArtisans();
  }, []);

  const fetchArtisans = async () => {
    try {
      const response = await axios.get("/api/profiles");
      const artisansData = response.data.filter(
        (profile) => profile.role === "artisan"
      );
      setArtisans(artisansData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {artisans.map((artisan) => (
        <div key={artisan.id} className="border border-gray-200">
          {artisan.username}
        </div>
      ))}
    </div>
  );
};

export default Artisans;
