const mongoose = require("mongoose");
const Campaign = require("../models/campaignModel");
const User = require("../models/User");
require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });

const MONGODB_URI = process.env.MONGO_URI;

async function seedCampaigns() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    const defaultUser = await User.findOne();
    if (!defaultUser) {
      console.error("No users found in the database. Please create a user first.");
      process.exit(1);
    }

    const campaigns = [
      {
        title: "Software Engineer Intern",
        location: "San Francisco, CA",
        stipend: 3000,
        deadline: new Date("2025-08-31"),
        description: "Work on exciting new features for our flagship product.",
        company: "Tech Corp",
        skillsRequired: ["JavaScript", "React", "Node.js"],
        status: "Open",
        createdBy: defaultUser._id,
      },
      {
        title: "Data Analyst Intern",
        location: "New York, NY",
        stipend: 2500,
        deadline: new Date("2025-09-15"),
        description: "Analyze user data to provide insights and drive product decisions.",
        company: "Data Inc.",
        skillsRequired: ["SQL", "Python", "Tableau"],
        status: "Open",
        createdBy: defaultUser._id,
      },
    ];

    await Campaign.insertMany(campaigns);

    console.log("Successfully seeded 2 campaigns.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding campaigns:", error);
    process.exit(1);
  }
}

seedCampaigns();