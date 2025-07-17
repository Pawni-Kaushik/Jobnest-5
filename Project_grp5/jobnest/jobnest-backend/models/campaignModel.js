const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  stipend: { type: Number, required: true }, // ✅ changed to Number
  deadline: { type: Date, required: true },  // ✅ changed to Date
  description: { type: String, required: true }, // 🧩 add if not already in use
  company: { type: String, required: true },     // 🧩 add if not already in use
  skillsRequired: [{ type: String }],            // 🧠 optional but clearer as array
  status: { type: String, default: "Open" },     // 🧩 backend uses default status
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // ✅ critical for validation
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports =
  mongoose.models.Campaign || mongoose.model("Campaign", campaignSchema);