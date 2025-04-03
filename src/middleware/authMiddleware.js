const jwt = require("../utils/jwt");
const User = require("../models/user"); // Adjust the path as necessary

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided or invalid format." });
  }

  try {
    // Extract token & remove potential quotes
    let token = authHeader.split(" ")[1].replace(/^"|"$/g, '');
    // Verify token
    const decoded = jwt.verifyToken(token);
    // Fetch user from database
    const user = await User.findByPk(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    req.user = user;
    next();
  } catch (error) {
   console.error("Token verification error:", error);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};
