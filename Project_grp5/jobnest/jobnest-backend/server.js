const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// 🔒 Load environment variables
dotenv.config();

// 🚀 Initialize Express app
const app = express();

// 🔗 Connect to MongoDB
connectDB();

// 🧰 Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 📦 Route Imports
const userRoutes = require('./routes/userRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const adminRoutes = require('./routes/adminRoutes'); // ✅ Added admin routes

// 🛣 Register Routes
app.use('/api/users', userRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/admin', adminRoutes); // ✅ Admin route mounted here

// 🩺 Health Check
app.get('/', (req, res) => {
  res.send('✅ JobNest API is running successfully!');
});

// 📡 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 JobNest backend listening on port ${PORT}`);
});