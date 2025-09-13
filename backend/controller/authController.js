const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

// Register
exports.register = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      "INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, 'USER')",
      [name, email, hashedPassword, address]
    );

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [user] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (user.length === 0) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const validPass = await bcrypt.compare(password, user[0].password);
    if (!validPass) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user[0].id, role: user[0].role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, role: user[0].role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
