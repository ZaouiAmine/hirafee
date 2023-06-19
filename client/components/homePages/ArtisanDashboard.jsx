const ArtisanDashboard = ({ currentUser }) => {
  useEffect(() => {
    const fetchArtisanProfile = async () => {
      try {
        const response = await fetch(`/api/profiles/${currentUser.id}`);
        const profile = await response.json();
      } catch (error) {
        console.error("Error fetching artisan profiles:", error);
      }
    };

    fetchArtisanProfiles();
  }, []);
  return <main className="min-h-screen">ArtisanDashboard</main>;
};
export default ArtisanDashboard;
