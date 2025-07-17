import React from "react";
import { useNavigate } from "react-router-dom";

const CampaignList = ({ campaigns }) => {
  const navigate = useNavigate();

  const handleCampaignClick = (id) => {
    navigate(`/campaign/${id}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {campaigns.map((c) => (
        <div
          key={c._id}
          className="bg-white p-4 rounded shadow text-blue-900 cursor-pointer"
          onClick={() => handleCampaignClick(c._id)}
        >
          <h2 className="text-lg font-semibold">{c.title}</h2>
          <p>📍 {c.location || "N/A"}</p>
          <p>💰 ₹{c.stipend != null ? c.stipend : "N/A"}</p>
          <p>🗓 Deadline: {c.deadline ? new Date(c.deadline).toLocaleDateString() : "N/A"}</p>
        </div>
      ))}
    </div>
  );
};

export default CampaignList;
