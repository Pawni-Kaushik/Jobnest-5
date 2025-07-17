const jwt = require("jsonwebtoken");

// 🔐 Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 🧼 Validate existence and "Bearer <token>" format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.warn("⚠️ Missing or malformed authorization header:", authHeader);
    return res.status(401).json({ message: "🚫 No valid token provided. Please log in." });
  }

  const token = authHeader.split(" ")[1];

  // 🔍 Catch empty or invalid token strings
  if (!token || ["undefined", "null", ""].includes(token)) {
    console.warn("⚠️ Token string is empty or invalid:", token);
    return res.status(403).json({ message: "🔏 Token is invalid or expired. Please log in again." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id || !decoded?.role) {
      console.warn("⚠️ Decoded token missing user ID or role:", decoded);
      return res.status(403).json({ message: "❌ Token does not contain valid user data." });
    }

    // 🧩 Attach decoded user info to request
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (error) {
    console.error("❌ Token verification error:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ message: "⏰ Token has expired. Please log in again." });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "🔏 Malformed token. Please log in again." });
    }

    return res.status(403).json({ message: "❌ Token authentication failed." });
  }
};

module.exports = { verifyToken };