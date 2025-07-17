const mongoose = require("mongoose");
const Campaign = require("../models/campaignModel");
require("dotenv").config();

const MONGODB_URI = process.env.MONGO_URI || "mongodb+srv://kambojlakshay0:61HRgB8beF2biu2N@cluster0.mttwm8f.mongodb.net/jobnest?retryWrites=true&w=majority&appName=Cluster0";

async function fillMissingCampaignFields() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    // Find campaigns missing any of the required fields
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
        // Set a default user ID or null (adjust as needed)
        // Use a valid ObjectId or remove required validation in schema
        // For now, skip updating to avoid validation error
        console.warn(`Skipping update for campaign ${campaign._id} due to missing createdBy.`);
      }
      if (!campaign.company) {
        campaign.company = "Unknown Company";
        updated = true;
      }
      if (!campaign.description) {
        campaign.description = "No description provided.";
        updated = true;
      }

      if (updated) {
        await campaign.save();
        console.log(`Updated campaign ${campaign._id} with default values.`);
      }
    }

    console.log("Missing fields fill completed.");
    process.exit(0);
  } catch (error) {
    console.error("Error filling missing campaign fields:", error);
    process.exit(1);
  }
}

fillMissingCampaignFields();
