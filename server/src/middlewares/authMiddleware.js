const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.authUser = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Token missing" });
    }
    const isBlacklisted = await userModel.findOne({ token: token });
    if (isBlacklisted) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Token blacklisted" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    return next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
