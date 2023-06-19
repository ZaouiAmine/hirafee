

import NotSignedPage from "@/components/homePages/NotSignedPage";
import AdminDashboard from "@/components/homePages/AdminDashboard";
import ClientDashboard from "@/components/homePages/ClientDashboard";
import ArtisanDashboard from "@/components/homePages/ArtisanDashboard";



export default function Home({ currentUser }) {
  if (currentUser) {
    switch (currentUser.role) {
      case "admin":
        return <AdminDashboard currentUser={currentUser} />;

      case "client":
        return <ClientDashboard currentUser={currentUser} />;

      case "artisan":
        return <ArtisanDashboard currentUser={currentUser} />;
    }
  } else {
    return <NotSignedPage />;
  }
}
