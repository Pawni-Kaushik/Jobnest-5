// const User = require("../models/User");
// const Campaign = require("../models/Campaign");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");

// // 🔐 Create JWT token
// const generateToken = (user) => {
//   return jwt.sign(
//     { id: user._id, role: user.role },
//     process.env.JWT_SECRET,
//     { expiresIn: "2h" }
//   );
// };

// // 📝 Register a new user
// exports.registerUser = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "Please fill all required fields" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//       role: role || "user",
//     });

//     const savedUser = await newUser.save();
//     const token = generateToken(savedUser);

//     res.status(201).json({ user: savedUser, token });
//   } catch (error) {
//     console.error("Registration failed:", error.message);
//     res.status(500).json({ message: "Registration error" });
//   }
// };

// // 🔓 Login user
// exports.loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user || !(await user.matchPassword(password))) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     const token = generateToken(user);
//     res.status(200).json({ user, token });
//   } catch (error) {
//     console.error("Login failed:", error.message);
//     res.status(500).json({ message: "Login error" });
//   }
// };

// // 👤 Get profile data
// exports.getUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select("-password");
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.status(200).json(user);
//   } catch (error) {
//     console.error("Profile fetch error:", error.message);
//     res.status(500).json({ message: "Unable to fetch profile" });
//   }
// };

// // 📝 Apply to a campaign
// exports.applyToCampaign = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const campaignId = req.params.id;

//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const campaign = await Campaign.findById(campaignId);
//     if (!campaign) return res.status(404).json({ message: "Campaign not found" });

//     const idStr = campaignId.toString();
//     if (user.appliedCampaigns.map(String).includes(idStr)) {
//       return res.status(400).json({ message: "You already applied to this campaign" });
//     }

//     user.appliedCampaigns.push(campaignId);
//     await user.save();

//     res.status(200).json({ message: "Application submitted successfully" });
//   } catch (error) {
//     console.error("Application error:", error.message);
//     res.status(500).json({ message: "Could not apply to campaign" });
//   }
// };

// // 📋 Get applied campaigns for user dashboard
// exports.getAppliedCampaigns = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id)
//       .populate({
//         path: "appliedCampaigns",
//         options: { sort: { deadline: 1 } }
//       });

//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.status(200).json(user.appliedCampaigns);
//   } catch (error) {
//     console.error("Error fetching applied campaigns:", error.message);
//     res.status(500).json({ message: "Could not fetch applied campaigns" });
//   }
// };

// // 🔍 Get recommended campaigns (excluding already applied)
// exports.getRecommendedCampaigns = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const excludeIds = user.appliedCampaigns.map(String);
//     const campaigns = await Campaign.find({
//       status: "Open",
//       _id: { $nin: excludeIds }
//     }).sort({ deadline: 1 });

//   } catch (error) {
//     console.error("Error fetching recommended campaigns:", error.message);
//     res.status(500).json({ message: "Could not fetch recommended campaigns" });
//   }
// };
const User = require("../models/User");
const Campaign = require("../models/Campaign");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// 🔐 Create JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );
};

// 📝 Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    const savedUser = await newUser.save();
    const token = generateToken(savedUser);

    res.status(201).json({ user: savedUser, token });
  } catch (error) {
    console.error("Registration failed:", error.message);
    res.status(500).json({ message: "Registration error" });
  }
};

// 🔓 Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user);
    res.status(200).json({ user, token });
  } catch (error) {
    console.error("Login failed:", error.message);
    res.status(500).json({ message: "Login error" });
  }
};

// 👤 Get profile data
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    console.error("Profile fetch error:", error.message);
    res.status(500).json({ message: "Unable to fetch profile" });
  }
};

// 📝 Apply to a campaign
exports.applyToCampaign = async (req, res) => {
  try {
    const userId = req.user.id;
    const campaignId = req.params.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const campaign = await Campaign.findById(campaignId);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });

    const idStr = campaignId.toString();
    if (user.appliedCampaigns.map(String).includes(idStr)) {
      return res.status(400).json({ message: "You already applied to this campaign" });
    }

    // ✅ 1. Add campaign to user's list
    user.appliedCampaigns.push(campaignId);

    // ✅ 2. Add user to campaign's applicants list
    campaign.applicants.push(userId);

    // ✅ 3. Save both documents
    await user.save();
    await campaign.save();

    res.status(200).json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error("Application error:", error.message);
    res.status(500).json({ message: "Could not apply to campaign" });
  }
};


// 📋 Get applied campaigns for user dashboard
exports.getAppliedCampaigns = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate({
        path: "appliedCampaigns",
        options: { sort: { deadline: 1 } }
      });

    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user.appliedCampaigns);
  } catch (error) {
    console.error("Error fetching applied campaigns:", error.message);
    res.status(500).json({ message: "Could not fetch applied campaigns" });
  }
};

// 🔍 Get recommended campaigns (excluding already applied)
exports.getRecommendedCampaigns = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    console.log("User ID:", req.user.id);
    console.log("Applied campaigns:", user.appliedCampaigns);

    // Return campaigns that the user has not applied to
    const campaigns = await Campaign.find({
      _id: { $nin: user.appliedCampaigns },
      status: "Open"
    }).sort({ deadline: 1 });

    console.log("Recommended campaigns found:", campaigns.length);

    res.status(200).json(campaigns);
  } catch (error) {
    console.error("Error fetching recommended campaigns:", error.message);
    res.status(500).json({ message: "Could not fetch recommended campaigns" });
  }
};
