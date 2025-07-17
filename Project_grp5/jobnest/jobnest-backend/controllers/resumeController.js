const Resume = require('../models/Resume');

exports.uploadResume = async (req, res) => {
  const { education, experience, skills, fileUrl } = req.body;
  try {
    const resume = await Resume.create({
      user: req.user.id,
      education, experience, skills, fileUrl
    });
    res.status(201).json(resume);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};