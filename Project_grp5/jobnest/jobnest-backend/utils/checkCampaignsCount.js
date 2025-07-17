const mongoose = require("mongoose");
const User = require("../models/User");
const Campaign = require("../models/Campaign");
require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });

const MONGODB_URI = process.env.MONGO_URI;

async function checkCampaignsCount() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    const adminUser = await User.findOne({ name: "pawni" });
    if (!adminUser) {
      console.log("Admin user 'pawni' not found.");
      process.exit(1);
    }
    console.log(`Admin user 'pawni' found with ID: ${adminUser._id}`);

    const campaigns = await Campaign.find();
    console.log(`\nFound ${campaigns.length} total campaigns. Checking createdBy field:`);
    campaigns.forEach(campaign => {
      console.log(`- Campaign "${campaign.title}" (ID: ${campaign._id}) was created by: ${campaign.createdBy}`);
    });

    const adminCampaigns = await Campaign.find({ createdBy: adminUser._id });
    console.log(`\nFound ${adminCampaigns.length} campaigns created by 'pawni'.`);


    process.exit(0);
  } catch (error) {
    console.error("Error checking campaigns count:", error);
    process.exit(1);
  }
}

checkCampaignsCount();
