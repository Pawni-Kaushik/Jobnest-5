// const mongoose = require('mongoose');

// const campaignSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: String,
//   goalAmount: Number,
//   deadline: Date,
//   category: String,
//   mediaUrl: String,
//   owner: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   }
// }, { timestamps: true });

// module.exports = mongoose.model('Campaign', campaignSchema);

const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  goalAmount: Number,
  deadline: Date,
  category: String,
  mediaUrl: String,

  // 🧑‍💼 Creator of the campaign
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // 🧑‍🤝‍🧑 Users who applied to this campaign
  applicants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],

  // 🏷 Tags for recommendation matching
  tags: [{
    type: String,
    trim: true
  }],

  // 🚦 Status (Open or Closed)
  status: {
    type: String,
    enum: ['Open', 'Closed'],
    default: 'Open'
  }

}, { timestamps: true });

module.exports = mongoose.model('Campaign', campaignSchema);
