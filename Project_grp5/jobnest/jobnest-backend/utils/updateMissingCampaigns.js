const mongoose = require("mongoose");
const Campaign = require("../models/campaignModel");
const User = require("../models/User");
require("dotenv").config();

const MONGODB_URI = process.env.MONGO_URI || "mongodb+srv://kambojlakshay0:61HRgB8beF2biu2N@cluster0.mttwm8f.mongodb.net/jobnest?retryWrites=true&w=majority&appName=Cluster0";

async function updateMissingCampaigns() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    // Find a valid user to assign as createdBy for missing campaigns
    const defaultUser = await User.findOne();
    if (!defaultUser) {
      console.error("No users found in the database. Please create a user first.");
      process.exit(1);
    }

    // Find campaigns missing required fields
    const campaigns = await Campaign.find({
      $or: [
        { createdBy: { $exists: false } },
        { company: { $exists: false } },
        { description: { $exists: false } },
      ],
    });

    for (const campaign of campaigns) {
      let updated = false;

      if (!campaign.createdBy) {
        campaign.createdBy = defaultUser._id;
        updated = true;
      }
      if (!campaign.company) {
        campaign.company = "Unknown Company";
        updated = true;
      }
      if (!campaign.description) {
        campaign.description = "No description provided.";
        updated = true;
      }
      if (!campaign.stipend) {
        campaign.stipend = 0;
        updated = true;
      }
      if (!campaign.location) {
        campaign.location = "Unknown Location";
        updated = true;
      }

      if (updated) {
        await campaign.save();
        console.log(`Updated campaign ${campaign._id} with default values.`);
      }
    }

    console.log("Manual missing fields update completed.");
    process.exit(0);
  } catch (error) {
    console.error("Error updating missing campaign fields:", error);
    process.exit(1);
  }
}

updateMissingCampaigns();
