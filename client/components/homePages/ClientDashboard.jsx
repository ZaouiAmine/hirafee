import React, { useEffect, useState } from "react";

const ClientDashboard = ({ currentUser }) => {
  const [artisanProfiles, setArtisanProfiles] = useState([]);

  useEffect(() => {
    const fetchArtisanProfiles = async () => {
      try {
        // Fetch all gigs
        const response = await fetch("/api/gigs");
        const gigs = await response.json();

        // Find the client's gig with matching clientId
        const clientGig = gigs.find((gig) => gig.clientId === currentUser.id);

        if (clientGig) {
          // Get the artisan IDs from the gig's proposals
          const artisanIds = clientGig.proposals;

          // Fetch artisan profiles based on the IDs
          const profilesPromises = artisanIds.map(async (id) => {
            const response = await fetch(`/api/profiles/${id}`);
            const profile = await response.json();
            return profile;
          });

          const profiles = await Promise.all(profilesPromises);
          setArtisanProfiles(profiles);
        }
      } catch (error) {
        console.error("Error fetching artisan profiles:", error);
      }
    };

    fetchArtisanProfiles();
  }, []);

  return (
    <div>
      <h1>Artisan Profiles</h1>
      {artisanProfiles.map((profile) => (
        <div key={profile.username}>
          <h2>{`${profile.firstName} ${profile.lastName}`}</h2>
          <p>{`Email: ${profile.email}`}</p>
          <p>{`Location: ${profile.location}`}</p>
          {/* Add additional profile information as needed */}
        </div>
      ))}
    </div>
  );
};

export default ClientDashboard;
