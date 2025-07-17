import React, { useEffect, useState } from "react";
import axios from "axios";
import CampaignList from "../components/CampaignList";
import RecommendedCampaigns from "../components/RecommendedCampaigns";

const CampaignsPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/campaign");
        setCampaigns(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load campaigns.");
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) return <div>Loading campaigns...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Campaigns Created</h1>
      <CampaignList campaigns={campaigns} />
      <RecommendedCampaigns />
    </div>
  );
};

export default CampaignsPage;
