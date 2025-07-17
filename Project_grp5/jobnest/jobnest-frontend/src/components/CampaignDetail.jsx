import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CampaignDetail = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [applicantCount, setApplicantCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaignDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/campaigns/${id}`);
        setCampaign(response.data.campaign);
        setAdmin(response.data.admin);
        setApplicantCount(response.data.applicantCount);
        setLoading(false);
      } catch (err) {
        setError("Failed to load campaign details.");
        setLoading(false);
      }
    };

    fetchCampaignDetails();
  }, [id]);

  if (loading) return <div>Loading campaign details...</div>;
  if (error) return <div>{error}</div>;
  if (!campaign) return <div>Campaign not found.</div>;

  if (!campaign) return <div>Campaign not found.</div>;

  // Normalize admin info from campaign.owner or campaign.createdBy
  const adminInfo = admin || campaign.owner || campaign.createdBy || null;

  // Normalize skillsRequired to array or string
  let skills = "N/A";
  if (campaign.skillsRequired) {
    if (Array.isArray(campaign.skillsRequired)) {
      skills = campaign.skillsRequired.join(", ");
    } else if (typeof campaign.skillsRequired === "string") {
      skills = campaign.skillsRequired;
    }
  }

  return (
    <div className="p-4 bg-white rounded shadow max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{campaign.title}</h1>
      <p><strong>Location:</strong> {campaign.location || "N/A"}</p>
      <p><strong>Stipend:</strong> ₹{campaign.stipend != null ? campaign.stipend : "N/A"}</p>
      <p><strong>Deadline:</strong> {campaign.deadline ? new Date(campaign.deadline).toLocaleDateString() : "N/A"}</p>
      <p><strong>Description:</strong> {campaign.description || "N/A"}</p>
      <p><strong>Company:</strong> {campaign.company || "N/A"}</p>
      <p><strong>Skills Required:</strong> {skills}</p>
      <p><strong>Status:</strong> {campaign.status || "N/A"}</p>
      <hr className="my-4" />
      <p><strong>Created by Admin:</strong> {adminInfo ? `${adminInfo.name || "N/A"} (${adminInfo.email || "N/A"})` : "N/A"}</p>
      <p><strong>Number of Applicants:</strong> {applicantCount}</p>
    </div>
  );
};

export default CampaignDetail;
