const mongoose = require("mongoose");
const Campaign = require("../models/campaignModel");
const User = require("../models/User");
require("dotenv").config();

const MONGODB_URI = process.env.MONGO_URI || "mongodb+srv://kambojlakshay0:61HRgB8beF2biu2N@cluster0.mttwm8f.mongodb.net/jobnest?retryWrites=true&w=majority&appName=Cluster0";

async function fixCampaignCreatedBy() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    const campaigns = await Campaign.find().lean();

    for (const campaign of campaigns) {
      if (!campaign.createdBy) {
        console.warn(`Campaign ${campaign._id} missing createdBy field.`);
        continue;
      }

      const userExists = await User.exists({ _id: campaign.createdBy });
      if (!userExists) {
        console.warn(`Campaign ${campaign._id} has invalid createdBy reference: ${campaign.createdBy}`);
        // Optionally, assign a default user or null here
        // For now, just log the issue
      }
    }

    console.log("Campaign createdBy validation completed.");
    process.exit(0);
  } catch (error) {
    console.error("Error validating campaign createdBy:", error);
    process.exit(1);
  }
}

fixCampaignCreatedBy();
