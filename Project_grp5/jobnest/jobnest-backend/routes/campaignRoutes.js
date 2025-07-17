const express = require("express");
const router = express.Router();

const {
  createCampaign,
  searchCampaigns,
  getAllCampaigns,
  getCampaignDetails,
  applyToCampaign,
} = require("../controllers/campaignController");

const { verifyToken } = require("../middleware/authMiddleware");

// ✅ Sanity checks
console.log("🧪 Controller functions loaded:",
  typeof createCampaign,
  typeof searchCampaigns,
  typeof getAllCampaigns,
  typeof getCampaignDetails
);

// 📝 Create a new campaign (authenticated users only)
router.post("/create", verifyToken, createCampaign);

// 🔍 Search campaigns by keyword and location
router.get("/search", searchCampaigns);

// 📋 Fetch all campaigns (admin/debug access or general listing)
router.get("/", verifyToken, getAllCampaigns);

// 📋 Fetch campaign details by ID
router.get("/:id", getCampaignDetails);

// Apply to a campaign
router.post("/:id/apply", verifyToken, applyToCampaign);

module.exports = router;
