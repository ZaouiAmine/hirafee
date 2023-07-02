import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ClientDashboard = ({ currentUser }) => {
  const [filteredGigs, setFilteredGigs] = useState([]);
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(1);

  useEffect(() => {
    // Fetch all gigs here and filter them
    const fetchGigs = async () => {
      try {
        const response = await fetch("/api/gigs");
        const gigs = await response.json();

        const filteredGigs = gigs.filter(
          (gig) => gig.clientId === currentUser.id && gig.proposals.length > 0
        );
        setFilteredGigs(filteredGigs);
      } catch (error) {
        console.error("Error fetching gigs:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const usersData = await response.json();
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchGigs();
    fetchUsers();
  }, [count]);

  const getUsernameFromId = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.username : "";
  };

  const handleApprove = async (gigId, userId) => {
    try {
      const response = await fetch(`/api/gigs/${gigId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ takenBy: userId }),
      });

      if (response.ok) {
        toast.success("Gig has been Taken!");
        setCount((prev) => prev + 1);
      } else {
        toast.error("Failed to approve gig.");
      }
    } catch (error) {
      console.error("Error approving gig:", error);
      toast.error("An error occurred while approving gig.");
    }
  };

  const handleUnapprove = async (gigId) => {
    try {
      const response = await fetch(`/api/gigs/${gigId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ takenBy: null }),
      });

      if (response.ok) {
        toast.success("Gig has been Unapproved!");
        setCount((prev) => prev + 1);
      } else {
        toast.error("Failed to unapprove gig.");
      }
    } catch (error) {
      console.error("Error unapproving gig:", error);
      toast.error("An error occurred while unapproving gig.");
    }
  };

  if (currentUser.banned) {
    return (
      <main className="min-h-screen p-4 pt-16">
        <h1 className="text-3xl font-bold mb-8">You are currently Banned</h1>
      </main>
    );
  } else {
    return (
      <main className="min-h-screen p-4 pt-16">
        <h1 className="text-3xl font-bold mb-8">Your Gigs</h1>
        {filteredGigs.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredGigs.map((gig) => (
              <div key={gig.id} className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-lg font-semibold mb-2">{gig.title}</h2>
                {gig.takenBy && (
                  <p className="text-gray-500 mb-2">
                    Taken by: {getUsernameFromId(gig.takenBy)}
                  </p>
                )}
                <ul>
                  {gig.proposals.map((proposal, index) => {
                    const username = getUsernameFromId(proposal);
                    const isTaken = gig.takenBy !== "";

                    return (
                      <li key={index} className="py-1 flex items-center">
                        <span>{username}</span>
                        {isTaken ? (
                          <button
                            onClick={() => handleUnapprove(gig.id)}
                            className="ml-2 px-2 py-1 rounded bg-red-500 text-white"
                          >
                            Unapprove
                          </button>
                        ) : (
                          <button
                            onClick={() => handleApprove(gig.id, proposal)}
                            className="ml-2 px-2 py-1 rounded bg-blue-500 text-white"
                          >
                            Approve
                          </button>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p>No gigs found.</p>
        )}
        <ToastContainer />
      </main>
    );
  }
};

export default ClientDashboard;
