import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    // TODO: Replace with real signup API logic
    console.log("Signing up with:", name, email, password);

    // Redirect on success — modify based on role
    navigate("/user"); // or "/admin"
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-800 relative text-white px-6">

      {/* Back to Home */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 text-sm text-white hover:underline z-20"
      >

      </button>

      {/* Signup Form */}
      <form
        onSubmit={handleSignup}
        className="bg-white text-blue-900 p-8 rounded shadow w-full max-w-sm z-10"
      >
        <h2 className="text-xl font-bold mb-6 text-center">Create Your JobNest Account</h2>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full mb-6 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Sign Up
        </button>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Log In
          </span>
        </p>
      </form>

      {/* Decorative Circles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-pink-400 rounded-full opacity-30 blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-blue-500 rounded-full opacity-30 blur-2xl"></div>
      </div>
    </div>
  );
};

export default SignupPage;