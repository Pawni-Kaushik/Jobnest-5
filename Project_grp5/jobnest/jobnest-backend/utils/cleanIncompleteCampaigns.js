const mongoose = require("mongoose");
const Campaign = require("../models/campaignModel");
require("dotenv").config();

const MONGODB_URI = process.env.MONGO_URI || "your_mongodb_connection_string_here";

async function cleanIncompleteCampaigns() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    // Find campaigns missing any of the required fields
    const incompleteCampaigns = await Campaign.find({
      $or: [
        { createdBy: { $exists: false } },
        { company: { $exists: false } },
        { description: { $exists: false } },
        { createdBy: null },
        { company: null },
        { description: null },
      ],
    });

    if (incompleteCampaigns.length === 0) {
      console.log("No incomplete campaigns found.");
      process.exit(0);
    }

    console.log(`Found ${incompleteCampaigns.length} incomplete campaigns:`);

    incompleteCampaigns.forEach((campaign) => {
      console.log(`- ID: ${campaign._id}, Title: ${campaign.title || "N/A"}`);
    });

    // Optionally delete incomplete campaigns
    // Uncomment the following lines to delete them

    const deleteResult = await Campaign.deleteMany({
      _id: { $in: incompleteCampaigns.map(c => c._id) }
    });
    console.log(`Deleted ${deleteResult.deletedCount} incomplete campaigns.`);
    

    process.exit(0);
  } catch (error) {
    console.error("Error cleaning incomplete campaigns:", error);
    process.exit(1);
  }
}

cleanIncompleteCampaigns();
