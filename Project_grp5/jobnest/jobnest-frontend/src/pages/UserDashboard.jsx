import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [appliedCampaigns, setAppliedCampaigns] = useState([]);
  const [recommendedCampaigns, setRecommendedCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // ✅ Apply to a campaign
  const handleApply = async (campaignId) => {
    try {
      await axios.post(`/api/campaigns/${campaignId}/apply`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Move the campaign from recommended to applied
      const campaignToMove = recommendedCampaigns.find(c => c._id === campaignId);
      if (campaignToMove) {
        setRecommendedCampaigns(recommendedCampaigns.filter(c => c._id !== campaignId));
        setAppliedCampaigns([...appliedCampaigns, campaignToMove]);
      }
      
      alert("Successfully applied to campaign!");
    } catch (err) {
      console.error("Apply error:", err.message);
      alert("Application failed. You may have already applied.");
    }
  };

  // 🧠 Load dashboard data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, appliedRes, recommendedRes] = await Promise.all([
          axios.get(`/api/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`/api/users/applied`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`/api/users/recommended`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setUser(userRes.data);
        setAppliedCampaigns(appliedRes.data);
        setRecommendedCampaigns(recommendedRes.data);
      } catch (err) {
        console.error("Dashboard fetch error:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const isApplied = (id) => appliedCampaigns.some(c => c._id === id);

  const handleCampaignClick = (id) => {
    navigate(`/campaigns/${id}`);
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50 text-blue-900">
      <h1 className="text-3xl font-bold mb-6">🧑‍💼 User Dashboard</h1>

      {user && (
        <div className="bg-white p-6 rounded shadow mb-8">
          <p className="text-lg font-medium">Welcome, {user.name}!</p>
          <p className="text-sm text-gray-600 mt-1">User ID: {user._id}</p>
          <p className="text-sm text-gray-600">Email: {user.email}</p>
          <p className="text-sm text-gray-600">Role: {user.role}</p>
        </div>
      )}

      {loading ? (
        <p>Loading dashboard...</p>
      ) : (
        <>
          {/* ✅ Applied Campaigns */}
          <section className="bg-white p-6 rounded shadow mb-10">
            <h2 className="text-2xl font-bold mb-4">✅ Applied Campaigns</h2>
            {appliedCampaigns.length === 0 ? (
              <p className="text-gray-500">You haven’t applied to any campaigns yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {appliedCampaigns.map(campaign => (
                  <div key={campaign._id} className="border rounded-lg p-4 bg-gray-50 cursor-pointer" onClick={() => handleCampaignClick(campaign._id)}>
                    <h3 className="text-xl font-semibold text-blue-900 mb-1">
                      {campaign.title}
                    </h3>
                    <p className="text-sm text-gray-700">🏢 Company: {campaign.company || "N/A"}</p>
                    <p className="text-sm text-gray-700">📍 Location: {campaign.location || "N/A"}</p>
                    <p className="text-sm text-gray-700">💰 Stipend: {campaign.stipend ? `₹${campaign.stipend}` : "Not specified"}</p>
                    <p className="text-sm text-gray-700">🗓 Deadline: {campaign.deadline ? new Date(campaign.deadline).toLocaleDateString() : "N/A"}</p>
                    {Array.isArray(campaign.skillsRequired) && campaign.skillsRequired.length > 0 && (
                      <p className="text-sm text-gray-700">
                        🧩 Skills: <span className="text-blue-800">{campaign.skillsRequired.join(", ")}</span>
                      </p>
                    )}
                    <div className="mt-3 flex justify-between items-center">
                      <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-semibold">
                        ✅ Applied
                      </span>
                      <span className="text-xs text-gray-500">ID: {campaign._id}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* 🔍 Recommended Campaigns */}
          <section className="bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">🔍 Recommended Campaigns</h2>
            {recommendedCampaigns.length === 0 ? (
              <p className="text-gray-500">No recommendations available yet.</p>
            ) : (
              <ul className="space-y-4">
                {recommendedCampaigns.map(campaign => (
                  <li key={campaign._id} className="border rounded p-4 bg-gray-50 cursor-pointer" onClick={() => handleCampaignClick(campaign._id)}>
                    <h3 className="text-lg font-semibold text-blue-900 mb-1">
                      {campaign.title}
                    </h3>
                    <p className="text-sm text-gray-700">📍 Location: {campaign.location}</p>
                    <p className="text-sm text-gray-700">💰 Stipend: ₹{campaign.stipend}</p>
                    <p className="text-sm text-gray-700">🗓 Deadline: {new Date(campaign.deadline).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-700">Skills: {campaign.skillsRequired?.join(", ") || "N/A"}</p>

                    {isApplied(campaign._id) ? (
                      <button className="mt-2 px-4 py-1 bg-gray-400 text-white rounded cursor-not-allowed" disabled>
                        Already Applied
                      </button>
                    ) : (
                      <button
                        className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        onClick={() => handleApply(campaign._id)}
                      >
                        Apply Now
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default UserDashboard;