import React, { useEffect, useState } from 'react';
import Router from 'next/router';

const ArtisanDashboard = ({ currentUser }) => {
  const [profile, setProfile] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    username: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    location: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profiles');
        const data = await response.json();
        const foundProfile = data.find((profile) => profile.belongsTo === currentUser.id);
        setProfile(foundProfile);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [currentUser.id]);

  const handleDelete = async () => {
    try {
      await fetch(`/api/profiles/${profile.id}`, { method: 'DELETE' ,body:{}});
      await fetch(`/api/users/${currentUser.id}`, { method: 'DELETE' });
      handleSignOut();
      Router.push("/")
      // Perform any additional actions after successful deletion
      // For example, redirect to another page or display a success message
      setShowConfirmationModal(false);
    } catch (error) {
      console.error('Error deleting profile:', error);
      // Handle error condition, such as displaying an error message
    }
  };

  const handleEditFormChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`/api/profiles/${profile.id}`, {
        method: 'PUT',
        body: JSON.stringify(editForm),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // Perform any additional actions after successful update
      // For example, fetch the updated profile data
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle error condition, such as displaying an error message
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch('/api/users/signout', { method: 'POST' });
      // Perform any additional actions after successful sign-out
      // For example, redirect to the login page
    } catch (error) {
      console.error('Error signing out:', error);
      // Handle error condition, such as displaying an error message
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <div className="lg:flex">
        <div className="lg:w-1/2 lg:sticky lg:top-0">
          {profile ? (
            <div className="bg-white rounded-lg shadow-lg p-8 mx-auto mb-4 max-w-lg relative">
              <div className="flex justify-between mb-4">
                <button
                  className="p-2 rounded-full bg-red-500 text-white mr-2"
                  onClick={() => {setShowConfirmationModal(true) }}
                >
                  Delete
                </button>
                <button
                  className="p-2 rounded-full bg-blue-500 text-white"
                  onClick={() => setShowEditModal(true)}
                >
                  Edit
                </button>
              </div>
              <img
                src={profile.portfolio[0].image}
                alt="Profile"
                className="w-40 h-40 rounded-full mx-auto mb-4"
              />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="text-gray-600 mb-4">
                <strong>Email:</strong> {profile.email}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Username:</strong> {profile.username}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Phone Number:</strong> {profile.phoneNumber}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Location:</strong> {profile.location}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Category:</strong> {profile.categorie}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Biography:</strong> {profile.biography}
              </p>
            </div>
          ) : (
            <p className="text-gray-600">No profile found.</p>
          )}
        </div>

        <div className="lg:w-1/2 lg:overflow-auto lg:pl-4">
          {profile && (
            <section className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Portfolio</h2>
              <div className="grid grid-cols-2 gap-4">
                {profile.portfolio.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-lg p-4">
                    <img
                      src={item.image}
                      alt="Portfolio Item"
                      className="w-full h-40 object-cover rounded mb-4"
                    />
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {showConfirmationModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-8">Are you sure you want to delete your profile?</p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 mr-2 text-white bg-red-500 rounded"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded"
                onClick={() => setShowConfirmationModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Edit Profile</h3>
            <form onSubmit={handleEditFormSubmit}>
              <div className="mb-4">
                <label htmlFor="edit-username" className="block text-gray-700 font-semibold">
                  Username
                </label>
                <input
                  type="text"
                  id="edit-username"
                  name="username"
                  value={editForm.username}
                  onChange={handleEditFormChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-400"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="edit-firstName" className="block text-gray-700 font-semibold">
                  First Name
                </label>
                <input
                  type="text"
                  id="edit-firstName"
                  name="firstName"
                  value={editForm.firstName}
                  onChange={handleEditFormChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-400"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="edit-lastName" className="block text-gray-700 font-semibold">
                  Last Name
                </label>
                <input
                  type="text"
                  id="edit-lastName"
                  name="lastName"
                  value={editForm.lastName}
                  onChange={handleEditFormChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-400"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="edit-phoneNumber" className="block text-gray-700 font-semibold">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="edit-phoneNumber"
                  name="phoneNumber"
                  value={editForm.phoneNumber}
                  onChange={handleEditFormChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-400"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="edit-location" className="block text-gray-700 font-semibold">
                  Location
                </label>
                <input
                  type="text"
                  id="edit-location"
                  name="location"
                  value={editForm.location}
                  onChange={handleEditFormChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-400"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 mr-2 text-white bg-blue-500 rounded"
                >
                  Save
                </button>
                <button
                  className="px-4 py-2 text-gray-600 bg-gray-200 rounded"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default ArtisanDashboard;
