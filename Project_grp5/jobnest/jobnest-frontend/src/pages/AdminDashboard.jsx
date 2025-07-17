import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    userCount: 0,
    adminCount: 0,
    campaignCount: 0,
  });

  const [campaigns, setCampaigns] = useState([]);
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [view, setView] = useState("campaigns");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/api/admin/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };

    const fetchCreatedCampaigns = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/campaigns", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("API Response:", res.data);
        setCampaigns(res.data);
      } catch (err) {
        console.error("Failed to fetch created campaigns:", err);
      }
    };

    fetchStats();
    fetchCreatedCampaigns();
  }, []);

  const handleCampaignClick = (id) => {
    console.log("Clicked campaign ID:", id);
    navigate(`/campaigns/${id}`);
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
      setView("users");
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/admin/admins", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAdmins(res.data);
      setView("admins");
    } catch (err) {
      console.error("Failed to fetch admins:", err);
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 text-blue-900">
      <h1 className="text-3xl font-bold mb-6">📊 Admin Dashboard</h1>

      <div className="bg-white p-6 rounded shadow mb-8">
        <p className="text-lg">Welcome, recruiter!</p>
      </div>

      {/* 🚀 Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded shadow text-center cursor-pointer" onClick={fetchUsers}>
          <h2 className="text-xl font-semibold text-blue-700 mb-2">👥 Users</h2>
          <p className="text-3xl font-bold">{stats.userCount}</p>
        </div>
        <div className="bg-white p-6 rounded shadow text-center cursor-pointer" onClick={fetchAdmins}>
          <h2 className="text-xl font-semibold text-blue-700 mb-2">🧑‍💼 Admins</h2>
          <p className="text-3xl font-bold">{stats.adminCount}</p>
        </div>
        <div className="bg-white p-6 rounded shadow text-center cursor-pointer" onClick={() => setView("campaigns")}>
          <h2 className="text-xl font-semibold text-blue-700 mb-2">📢 Campaigns</h2>
          <p className="text-3xl font-bold">{stats.campaignCount}</p>
        </div>
      </div>

      {/* 📄 Campaign List */}
      <div className="bg-white p-6 rounded shadow">
        {view === "campaigns" && (
          <>
            <h2 className="text-2xl font-bold mb-4">🗂️ Campaigns Created</h2>
            {!Array.isArray(campaigns) || campaigns.length === 0 ? (
              <p className="text-gray-500">No campaigns found.</p>
            ) : (
              <ul className="space-y-4">
                {campaigns.map((campaign) => (
                  <li
                    key={campaign._id}
                    className="border rounded p-4 cursor-pointer"
                    onClick={() => handleCampaignClick(campaign._id)}
                  >
                    <h3 className="text-lg font-semibold">{campaign.title}</h3>
                    <p className="text-sm text-gray-700">📍 Location: {campaign.location}</p>
                    <p className="text-sm text-gray-700">💰 Stipend: ₹{campaign.stipend}</p>
                    <p className="text-sm text-gray-700">🕒 Deadline: {new Date(campaign.deadline).toLocaleDateString()}</p>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {view === "users" && (
          <>
            <h2 className="text-2xl font-bold mb-4">👥 Users</h2>
            {users.length === 0 ? (
              <p className="text-gray-500">No users found.</p>
            ) : (
              <ul className="space-y-4">
                {users.map((user) => (
                  <li key={user._id} className="border rounded p-4">
                    <h3 className="text-lg font-semibold">{user.name}</h3>
                    <p className="text-sm text-gray-700">{user.email}</p>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {view === "admins" && (
          <>
            <h2 className="text-2xl font-bold mb-4">🧑‍💼 Admins</h2>
            {admins.length === 0 ? (
              <p className="text-gray-500">No admins found.</p>
            ) : (
              <ul className="space-y-4">
                {admins.map((admin) => (
                  <li key={admin._id} className="border rounded p-4">
                    <h3 className="text-lg font-semibold">{admin.name}</h3>
                    <p className="text-sm text-gray-700">{admin.email}</p>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
