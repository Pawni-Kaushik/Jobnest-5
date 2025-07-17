// pages/SignupPage.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await axios.post("/api/auth/signup", form);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    navigate(form.role === "admin" ? "/admin" : "/user");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20 space-y-4 p-6 border rounded shadow">
      <h1 className="text-xl font-bold">Sign Up</h1>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} className="w-full p-2 border" />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border" />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-2 border" />
      <select name="role" onChange={handleChange} className="w-full p-2 border">
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Sign Up</button>
    </form>
  );
};

export default SignupPage;