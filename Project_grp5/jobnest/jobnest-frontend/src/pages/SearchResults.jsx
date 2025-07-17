import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const keyword = queryParams.get("keyword")?.trim().toLowerCase() || "";
  const location = queryParams.get("location")?.trim().toLowerCase() || "";

  const [results, setResults] = useState([]);
  const [appliedIds, setAppliedIds] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/campaign/search`,
          {
            params: { keyword, location },
          }
        );
        setResults(res.data);
      } catch (err) {
        console.error("Search failed:", err);
      }
    };

    fetchResults();
  }, [keyword, location]);

  const handleApply = async (campaignId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/apply/${campaignId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAppliedIds((prev) => [...prev, campaignId]);
      alert("Application submitted!");
    } catch (err) {
      console.error("Apply error:", err.message);
      alert("Could not apply. You might’ve already submitted.");
    }
  };

  const isApplied = (id) => appliedIds.includes(id);

  return (
    <div className="min-h-screen px-4 py-8 text-center">
      <h1 className="text-2xl font-bold mb-4">🔍 Search Results</h1>
      <p className="text-gray-700 text-lg mb-6">
        Showing results for <strong>{keyword || "everything"}</strong> in{" "}
        <strong>{location || "all locations"}</strong>
      </p>

      {results.length === 0 ? (
        <p className="text-gray-500">No campaigns found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((campaign) => (
            <div
              key={campaign._id}
              className="bg-white text-left p-4 rounded shadow text-blue-800"
            >
              <h2 className="text-xl font-semibold mb-1">
                {campaign.title || "Untitled"}
              </h2>
              <p className="text-sm mb-1">📍 {campaign.location || "N/A"}</p>
              <p className="text-sm mb-1">💰 {campaign.stipend || "Not specified"}</p>
              <p className="text-sm mb-2">
                🗓 Deadline:{" "}
                {campaign.deadline
                  ? new Date(campaign.deadline).toLocaleDateString()
                  : "Not provided"}
              </p>
              {isApplied(campaign._id) ? (
                <button className="px-4 py-1 bg-gray-400 text-white rounded cursor-not-allowed">
                  Already Applied
                </button>
              ) : (
                <button
                  onClick={() => handleApply(campaign._id)}
                  className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  Apply Now
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;