const User = require("../models/User"); // ✅ Adjusted filename casing
const Campaign = require("../models/campaignModel");

// 📊 Get statistics for dashboard
exports.getAdminStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments({ role: "user" });
    const adminCount = await User.countDocuments({ role: "admin" });
    const campaignCount = await Campaign.countDocuments();

    res.status(200).json({ userCount, adminCount, campaignCount });
  } catch (error) {
    console.error("❌ Error fetching admin stats:", error.message);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};

// 📢 Get all campaigns for admin view
exports.getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.status(200).json(campaigns);
  } catch (error) {
    console.error("❌ Error fetching campaigns:", error.message);
    res.status(500).json({ message: "Failed to fetch campaigns" });
  }
};

// 👥 Get all users with the 'user' role
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("❌ Error fetching users:", error.message);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// 🧑‍💼 Get all users with the 'admin' role
exports.getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");
    res.status(200).json(admins);
  } catch (error) {
    console.error("❌ Error fetching admins:", error.message);
    res.status(500).json({ message: "Failed to fetch admins" });
  }
};