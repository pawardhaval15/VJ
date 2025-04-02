const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if the token corresponds to the static Master Admin ID
    if (decoded.adminId !== process.env.MASTER_ADMIN_ID) {
      return res.status(403).json({ message: "Access denied. Only master admin allowed." });
    }

    req.adminId = decoded.adminId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token." });
  }
};
