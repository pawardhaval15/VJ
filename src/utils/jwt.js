const jwt = require("jsonwebtoken");

module.exports = {
  generateToken: (user) => {
    if (!user || !user.userId) {
      throw new Error("User ID is missing in token generation.");
    }
    return jwt.sign(
      { userId: user.userId, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "30d" } 
    );
  },
  verifyToken: (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
};