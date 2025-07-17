import React, { useEffect, useState } from "react";
import axios from "axios";
import CampaignList from "./CampaignList";

const RecommendedCampaigns = () => {
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecommended = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/user/recommended", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRecommended(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load recommended campaigns.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommended();
  }, []);

  const handleApply = async (campaignId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`/api/user/apply/${campaignId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Remove applied campaign from recommended list
      setRecommended((prev) => prev.filter((c) => c._id !== campaignId));
      alert("Applied successfully!");
    } catch (err) {
      alert("Failed to apply to campaign.");
    }
  };

  if (loading) return <div>Loading recommended campaigns...</div>;
  if (error) return <div>{error}</div>;
  if (recommended.length === 0) return <div>No recommended campaigns available.</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-3">Recommended Campaigns</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommended.map((campaign) => (
          <div key={campaign._id} className="bg-white p-4 rounded shadow text-blue-900">
            <h3 className="text-lg font-semibold">{campaign.title}</h3>
            <p>Company: {campaign.company || "N/A"}</p>
            <p>Location: {campaign.location || "N/A"}</p>
            <p>Stipend: {campaign.stipend != null ? `₹${campaign.stipend}` : "N/A"}</p>
            <p>Deadline: {campaign.deadline ? new Date(campaign.deadline).toLocaleDateString() : "N/A"}</p>
            <button
              onClick={() => handleApply(campaign._id)}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedCampaigns;
