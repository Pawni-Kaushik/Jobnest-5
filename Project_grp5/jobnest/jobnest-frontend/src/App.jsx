import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ✨ Pages
import LandingPage from "./pages/Landingpage";
import SearchResults from "./pages/SearchResults";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CreateCampaign from "./pages/CreateCampaign";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CampaignsPage from "./pages/CampaignsPage";

// 🧭 Global Components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute"; // 🔐 Guarded routes
import CampaignDetail from "./components/CampaignDetail";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <Routes>
          {/* 🏠 Public Pages */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* 🔐 Protected Routes */}
          <Route
            path="/user"
            element={
              <ProtectedRoute role="user">
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-campaign"
            element={
              <ProtectedRoute role="admin">
                <CreateCampaign />
              </ProtectedRoute>
            }
          />
          <Route
            path="/campaigns"
            element={
              <ProtectedRoute>
                <CampaignsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/campaigns/:id"
            element={
              <ProtectedRoute>
                <CampaignDetail />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
