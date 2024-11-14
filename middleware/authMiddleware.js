const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    // Verify token
    const decoded = jwt.verify(token, 'your_secret_key');
    req.user = decoded; // Store decoded user data in req.user
    console.log("Authenticated user:", req.user);
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    res.status(401).json({ msg: "Token is not valid" });
  }
};


