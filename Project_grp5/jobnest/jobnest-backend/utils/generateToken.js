const jwt = require('jsonwebtoken');

const generateToken = (id, role = 'jobSeeker') => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '7d', // Token validity duration
  });
};

module.exports = generateToken;