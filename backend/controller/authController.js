const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Register
exports.register = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ msg: "All fields including role are required" });
    }

    const validRoles = ["ADMIN", "USER", "OWNER"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ msg: "Invalid role" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ msg: "Invalid email format" });
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        msg: "Password must be at least 8 characters, include uppercase, lowercase, numbers and special character",
      });
    }

    // Check if email exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ msg: "Email already registered" });
    }

    // Create user
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.createUser(name, email, hashedPassword, address, role);

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    res.json({ token, role: user.role });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
