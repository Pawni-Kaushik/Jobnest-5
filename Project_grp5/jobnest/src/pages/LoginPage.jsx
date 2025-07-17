import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const trimmedEmail = credentials.email.trim().toLowerCase();
    const trimmedPassword = credentials.password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError("Please fill in both email and password.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/login`,
        {
          email: trimmedEmail,
          password: trimmedPassword
        }
      );

      console.log("Login response:", res);

      if (res?.status === 200 && res?.data?.token && res?.data?.user) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate(res.data.user.role === "admin" ? "/admin" : "/user");
      } else {
        throw new Error("Unexpected login response.");
      }
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-20 space-y-4 p-6 border rounded-lg shadow-lg bg-blue-100"
    >
      <h1 className="text-2xl font-bold text-blue-900">Login</h1>

      {error && (
        <div className="text-red-600 bg-red-100 px-3 py-2 rounded">
          {error}
        </div>
      )}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={credentials.email}
        onChange={handleChange}
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        required
      />

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        />
        <span
          className="absolute right-3 top-2.5 cursor-pointer text-sm text-blue-600 hover:underline"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? "Hide" : "Show"}
        </span>
      </div>

      <button
        type="submit"
        className={`w-full bg-blue-600 text-white px-4 py-2 rounded ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700 transition"
        }`}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Log In"}
      </button>
    </form>
  );
};

export default LoginPage;