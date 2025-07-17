import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import CreateCampaign from "./pages/CreateCampaign";
import LandingPage from "./pages/Landingpage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./utils/ProtectedRoute";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* 🏠 Public Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* 🔐 Public Auth Pages */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* 👤 User Dashboard */}
        <Route
          path="/user"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* 💼 Create Campaign */}
        <Route
          path="/create-campaign"
          element={
            <ProtectedRoute role="user">
              <CreateCampaign />
            </ProtectedRoute>
          }
        />

        {/* 🛠 Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* 🚧 Catch-All */}
        <Route path="*" element={<NotFound />} />
      </Routes>
       <Navbar />
  <Routes>
    {/* all your routes here */}
  </Routes>

    </Router>
  );
}

export default App;