const mongoose = require('mongoose');
const resumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  url: { type: String, required: true },
  skills: [String],
  experience: String,
  education: String
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);