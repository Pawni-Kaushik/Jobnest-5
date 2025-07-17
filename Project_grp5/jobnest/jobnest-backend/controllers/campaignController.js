const mongoose = require("mongoose");
const Campaign = require("../models/campaignModel");
const User = require("../models/User");

// 📝 Create a new campaign (protected route)
const createCampaign = async (req, res) => {
  try {
    const {
      title,
      location,
      stipend,
      deadline,
      description,
      skillsRequired,
      company,
      status,
    } = req.body;

    if (!req.user?.id) {
      return res.status(403).json({ message: "Unauthorized: user ID missing from token." });
    }

    console.log("Creating campaign for user:", req.user);

    const trimmedTitle = title ? title.trim() : "";
    const trimmedLocation = location ? location.trim() : "";
    const trimmedDescription = description ? description.trim() : "";
    const trimmedCompany = company ? company.trim() : "";
    const trimmedStatus = status ? status.trim() : "Open";

    if (
      !trimmedTitle ||
      !trimmedLocation ||
      stipend === undefined ||
      !deadline ||
      !trimmedDescription ||
      !skillsRequired ||
      !trimmedCompany
    ) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const processedSkills =
      typeof skillsRequired === "string"
        ? skillsRequired.split(",").map((skill) => skill.trim())
        : Array.isArray(skillsRequired)
        ? skillsRequired.map((skill) => skill.trim())
        : [];

    const newCampaign = new Campaign({
      title: trimmedTitle,
      location: trimmedLocation,
      stipend: stipend ? parseInt(stipend) : 0,
      deadline: new Date(deadline),
      description: trimmedDescription,
      company: trimmedCompany,
      skillsRequired: processedSkills.length > 0 ? processedSkills : ["unspecified"],
      status: trimmedStatus,
      createdBy: req.user.id,  // Fix: use createdBy to match schema
    });

    const savedCampaign = await newCampaign.save();

    res.status(201).json({
      message: "✅ Campaign created successfully!",
      campaign: savedCampaign,
    });
  } catch (error) {
    console.error("🛑 Error creating campaign:", error);
    res.status(500).json({ message: "Failed to create campaign", error: error.message });
  }
};

// 🔍 Search campaigns by keyword and location (flexible matching)
const searchCampaigns = async (req, res) => {
  try {
    const keyword = req.query.keyword?.trim().toLowerCase();
    const location = req.query.location?.trim().toLowerCase();

    const filters = { status: "Open" };
    const andConditions = [];

    if (keyword) {
      andConditions.push({
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
          { company: { $regex: keyword, $options: "i" } },
          { location: { $regex: keyword, $options: "i" } },
        ],
      });
    }

    if (location) {
      andConditions.push({ location: { $regex: location, $options: "i" } });
    }

    if (andConditions.length > 0) {
      filters.$and = andConditions;
    }

    console.log("🔍 Search filters applied:", JSON.stringify(filters, null, 2));

    const campaigns = await Campaign.find(filters).sort({ deadline: 1 });

    console.log("📦 Campaigns matched:", campaigns.length);
    res.status(200).json(campaigns);
  } catch (error) {
    console.error("🛑 Error searching campaigns:", error.message);
    res.status(500).json({ message: "Failed to fetch campaigns" });
  }
};

// 📋 Fetch all campaigns (admin/debug route)
const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.status(200).json(campaigns);
  } catch (error) {
    console.error("🛑 Error fetching all campaigns:", error.message);
    res.status(500).json({ message: "Failed to fetch campaigns" });
  }
};

// 📋 Fetch campaign details by ID with admin info and applicant count
const getCampaignDetails = async (req, res) => {
  try {
    const campaignId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(campaignId)) {
      return res.status(400).json({ message: "Invalid campaign ID" });
    }

    const campaign = await Campaign.findById(campaignId);
    console.log("Fetched campaign document:", campaign);

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    await Campaign.populate(campaign, { path: "createdBy", select: "name email role" });

    console.log("Populated admin info:", campaign.createdBy);

    // Count number of users who applied to this campaign
    // Assuming you have an Application model or similar to track applications
    // For now, let's assume Campaign has an array field 'applicants' with user IDs
    const applicantCount = await User.countDocuments({ appliedCampaigns: campaignId });

    res.status(200).json({
      campaign,
      admin: campaign.createdBy,
      applicantCount,
    });
  } catch (error) {
    console.error("🛑 Error fetching campaign details:", error.stack || error);
    console.error("Request params:", req.params);
    res.status(500).json({ message: "Failed to fetch campaign details" });
  }
};

// 🚀 Apply to a campaign
const applyToCampaign = async (req, res) => {
  try {
    const { id: campaignId } = req.params;
    const userId = req.user.id;

    // 1. Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Find the campaign
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    // 3. Check if already applied
    if (user.appliedCampaigns.includes(campaignId)) {
      return res.status(400).json({ message: "You have already applied to this campaign" });
    }

    // 4. Add to applied campaigns and save
    user.appliedCampaigns.push(campaignId);
    await user.save();

    res.status(200).json({ message: "Successfully applied to the campaign" });
  } catch (error) {
    console.error("🛑 Error applying to campaign:", error);
    res.status(500).json({ message: "Failed to apply to campaign" });
  }
};

module.exports = {
  createCampaign,
  searchCampaigns,
  getAllCampaigns,
  getCampaignDetails,
  applyToCampaign,
};
