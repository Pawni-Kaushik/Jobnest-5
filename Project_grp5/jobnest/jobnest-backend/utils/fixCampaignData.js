const mongoose = require("mongoose");
const Campaign = require("../models/campaignModel");
require("dotenv").config();

const MONGODB_URI = process.env.MONGO_URI || "mongodb+srv://kambojlakshay0:61HRgB8beF2biu2N@cluster0.mttwm8f.mongodb.net/jobnest?retryWrites=true&w=majority&appName=Cluster0";

async function fixCampaignData() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    const campaigns = await Campaign.find();

    for (const campaign of campaigns) {
      let updated = false;

      // Skip campaigns missing required fields to avoid validation errors
      if (!campaign.createdBy || !campaign.company || !campaign.description) {
        console.warn(`Skipping campaign ${campaign._id} due to missing required fields.`);
        continue;
      }

      // Convert stipend to number if it's a string
      if (typeof campaign.stipend === "string") {
        campaign.stipend = parseInt(campaign.stipend, 10);
        updated = true;
      }

      // Normalize title, location, company, status to lowercase
      if (campaign.title && campaign.title !== campaign.title.toLowerCase()) {
        campaign.title = campaign.title.toLowerCase();
        updated = true;
      }
      if (campaign.location && campaign.location !== campaign.location.toLowerCase()) {
        campaign.location = campaign.location.toLowerCase();
        updated = true;
      }
      if (campaign.company && campaign.company !== campaign.company.toLowerCase()) {
        campaign.company = campaign.company.toLowerCase();
        updated = true;
      }
      if (campaign.status && campaign.status !== campaign.status.toLowerCase()) {
        campaign.status = campaign.status.toLowerCase();
        updated = true;
      }

      if (updated) {
        await campaign.save();
        console.log(`Updated campaign ${campaign._id}`);
      }
    }

    console.log("Data fix completed.");
    process.exit(0);
  } catch (error) {
    console.error("Error fixing campaign data:", error);
    process.exit(1);
  }
}

fixCampaignData();
