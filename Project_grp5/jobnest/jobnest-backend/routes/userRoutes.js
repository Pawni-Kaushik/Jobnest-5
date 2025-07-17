const express = require("express");
const router = express.Router();

// 🧠 Destructured controller methods
const {
  registerUser,
  loginUser,
  getUserProfile,
  getAppliedCampaigns,
  getRecommendedCampaigns,
  applyToCampaign,
} = require("../controllers/userController");

// 🔐 Auth middleware
const { verifyToken } = require("../middleware/authMiddleware");

// 🔐 Auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// 👤 Logged-in user info
router.get("/me", verifyToken, getUserProfile);

// ✅ Applied campaigns (for user dashboard)
router.get("/applied", verifyToken, getAppliedCampaigns);

// 🔍 Recommended campaigns
router.get("/recommended", verifyToken, getRecommendedCampaigns);

// 📝 Apply to a campaign
router.post("/apply/:id", verifyToken, applyToCampaign);

module.exports = router;