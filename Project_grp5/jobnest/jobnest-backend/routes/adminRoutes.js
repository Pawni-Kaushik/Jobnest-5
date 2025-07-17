const express = require("express");
const router = express.Router();
const { getAdminStats, getAllCampaigns, getUsers, getAdmins } = require("../controllers/adminController");

// 📊 Dashboard stats route
router.get("/stats", getAdminStats);

// 📢 Campaigns list route
router.get("/campaigns", getAllCampaigns);

// 👥 User and admin list routes
router.get("/users", getUsers);
router.get("/admins", getAdmins);

module.exports = router;