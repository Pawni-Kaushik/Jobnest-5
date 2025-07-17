import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const syncUser = () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Error parsing user data:", err);
        localStorage.removeItem("user");
        setUser(null);
      }
    };

    syncUser();
    window.addEventListener("storage", syncUser);
    window.addEventListener("login", syncUser);

    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("login", syncUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
      <div className="flex justify-between items-center mb-2 sm:mb-0">
        <h1 className="text-xl font-bold text-blue-900">JobNest</h1>
        {user && (
          <span className="ml-4 text-sm text-gray-500">
            Welcome, <strong>{user.name}</strong>{" "}
            <span className="text-xs italic">({user.role})</span>
            <span className="text-xs ml-2 text-gray-400">ID: {user.id}</span>
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <Link to="/" className="text-blue-900 hover:underline">Home</Link>

        {!user && (
          <>
            <Link to="/login" className="text-green-500 hover:underline">Login</Link>
            <Link to="/signup" className="text-green-500 hover:underline">Sign Up</Link>
          </>
        )}

        {user?.role === "user" && (
          <>
            <Link to="/user" className="text-purple-500 hover:underline">User Dashboard</Link>
            <Link to="/create-campaign" className="text-purple-500 hover:underline">Create Campaign</Link>
          </>
        )}

        {user?.role === "admin" && (
          <>
            <Link to="/admin" className="text-red-500 hover:underline">Admin Dashboard</Link>
            <Link to="/user" className="text-purple-500 hover:underline">User Dashboard</Link>
            <Link to="/create-campaign" className="text-purple-500 hover:underline">Create Campaign</Link>
          </>
        )}

        {user && (
          <button
            type="button"
            onClick={handleLogout}
            className="text-gray-500 hover:text-red-600 hover:underline"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;