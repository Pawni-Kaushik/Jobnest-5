// pages/CreateCampaign.js
import { useState } from "react";
import axios from "axios";

const CreateCampaign = () => {
  const [formData, setFormData] = useState({
    title: "", description: "", company: "", location: "",
    stipend: "", skillsRequired: "", deadline: ""
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios.post("/api/campaign", formData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Create a New Campaign</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["title", "company", "location", "stipend", "skillsRequired", "deadline", "description"].map(field => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field}
            value={formData[field]}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        ))}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default CreateCampaign;