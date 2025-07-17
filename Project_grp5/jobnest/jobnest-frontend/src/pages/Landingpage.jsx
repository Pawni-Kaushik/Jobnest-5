import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();

    if (searchQuery.trim()) queryParams.append("keyword", searchQuery.trim());
    if (location) queryParams.append("location", location);

    navigate(`/search?${queryParams.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 text-white px-6 py-10 flex flex-col items-center">
      {/* Top Header */}
      <header className="w-full flex justify-between items-center mb-8">
        <div className="text-2xl font-bold">JobNest</div>
      </header>

      {/* Hero Section */}
      <div className="text-center mb-10 max-w-3xl">
        <h1 className="text-4xl font-extrabold mb-2">Start your journey</h1>
        <p className="text-lg text-gray-200">
          Smart Talent Bridge Between Candidates and Recruiters.
        </p>
      </div>

      {/* Search Form */}
      <form
        onSubmit={handleSearchSubmit}
        className="flex gap-2 mb-8 w-full max-w-xl"
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search internships, jobs or companies"
          className="flex-grow px-4 py-2 rounded text-black"
        />
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="px-4 py-2 rounded text-black bg-white"
        >
          <option value="">All Locations</option>
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Remote">Remote</option>
        </select>
        <button
          type="submit"
          className="px-4 py-2 bg-white text-blue-900 rounded shadow hover:bg-blue-100 transition"
        >
          🔍 Search
        </button>
      </form>

      {/* Category Tags */}
      <div className="flex flex-wrap gap-4 justify-center mb-10">
        {["IT", "Marketing", "Sales", "Finance", "HR"].map((category) => (
          <button
            key={category}
            className="bg-white text-blue-800 font-medium px-4 py-2 rounded shadow hover:bg-blue-100 transition"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Quick Navigation */}
      <div className="flex gap-6">
        <Link
          to="/user"
          className="bg-white text-blue-900 font-medium px-5 py-2 rounded shadow hover:bg-blue-100 transition"
        >
          🧑‍💼 User Dashboard
        </Link>
        <Link
          to="/admin"
          className="bg-white text-blue-900 font-medium px-5 py-2 rounded shadow hover:bg-blue-100 transition"
        >
          🛠 Admin Dashboard
        </Link>
        <Link
          to="/create-campaign"
          className="bg-white text-blue-900 font-medium px-5 py-2 rounded shadow hover:bg-blue-100 transition"
        >
          📢 Create Campaign
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;