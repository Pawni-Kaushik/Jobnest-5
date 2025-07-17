const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  // 🧑‍💼 Campaigns created by the user (admin use)
  campaigns: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Campaign"
  }],
  // 📌 Campaigns this user has applied to
  appliedCampaigns: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Campaign"
  }],
  // 🎯 Optional: User’s skill set for recommendations
  skills: [{
    type: String,
    trim: true
  }]
}, { timestamps: true });

// 🔒 Method to compare passwords during login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.models.User || mongoose.model("User", userSchema);