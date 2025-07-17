// pages/LandingPage.jsx
import { Link } from "react-router-dom";

const LandingPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-blue-500 text-white px-4 py-8">
    
  
    <div className="border-4 border-white rounded-lg px-6 py-4 shadow-lg mb-6 text-center bg-blue-800">
      <h1 className="text-4xl font-extrabold tracking-wide">
        Welcome to JobNest
      </h1>
    </div>

   
    <div className=" shadow-md max-w-lg text-center mb-6">
      <h1 className="text-white font-bold text-lg">
        Smart Talent Bridge between Candidates & Recruiters
      </h1>
    </div>
<div className=" shadow-md max-w-lg text-center mb-8">
      <p className="text-black text-lg">
 (developed by Pawni Kaushik, Muskan Tanwar, Daiwik Dogra)
      </p>
    </div>
    {/* Navigation Buttons */}
    <div className="flex flex-wrap gap-4 justify-center">
      <Link to="/user">
        <button className="bg-white text-blue-900 font-medium px-4 py-2 rounded shadow hover:bg-blue-100 transition">
          User Dashboard
        </button>
      </Link>

      <Link to="/admin">
        <button className="bg-white text-blue-900 font-medium px-4 py-2 rounded shadow hover:bg-blue-100 transition">
          Admin Dashboard
        </button>
      </Link>

      <Link to="/create-campaign">
        <button className="bg-white text-blue-900 font-medium px-4 py-2 rounded shadow hover:bg-blue-100 transition">
          Create Campaign
        </button>
      </Link>
    </div>
  </div>
);

export default LandingPage;