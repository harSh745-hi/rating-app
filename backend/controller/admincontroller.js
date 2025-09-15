const db = require("../config/databse");


// Dashboard Stats

exports.getDashboardStats = async (req, res) => {
  try {
    const [users] = await db.query("SELECT COUNT(*) AS total FROM users");
    const [stores] = await db.query("SELECT COUNT(*) AS total FROM stores");
    const [ratings] = await db.query("SELECT COUNT(*) AS total FROM ratings");

    res.json({
      users: users[0].total,
      stores: stores[0].total,
      ratings: ratings[0].total,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching dashboard stats" });
  }
};


// Add New User (Admin can add Admin/User/Store Owner)

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const validRoles = ["ADMIN", "USER", "OWNER"];
    
    if (!validRoles.includes(role)) {
      return res.status(400).json({ msg: "Invalid role" });
    }

    // Hash password
    const bcrypt = require("bcryptjs");
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)",
      [name, email, hashedPassword, address || "", role]
    );

    res.status(201).json({ msg: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error creating user" });
  }
};


// Get All Users (with filters)

exports.getUsers = async (req, res) => {
  try {
    const { name, email, address, role } = req.query;
    let query = "SELECT id, name, email, address, role FROM users WHERE 1=1";
    let params = [];

    if (name) {
      query += " AND name LIKE ?";
      params.push(`%${name}%`);
    }
    if (email) {
      query += " AND email LIKE ?";
      params.push(`%${email}%`);
    }
    if (address) {
      query += " AND address LIKE ?";
      params.push(`%${address}%`);
    }
    if (role) {
      query += " AND role = ?";
      params.push(role);
    }

    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching users" });
  }
};


// Get All Stores (with avg rating)

exports.getStores = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT s.id, s.name, s.email, s.address,
             COALESCE(AVG(r.rating), 0) AS avgRating
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      GROUP BY s.id
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching stores" });
  }
};


// Get User Details 

exports.getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(
      "SELECT id, name, email, address, role FROM users WHERE id = ?",
      [id]
    );

    if (rows.length === 0) return res.status(404).json({ msg: "User not found" });

    let user = rows[0];

    if (user.role === "STORE_OWNER") {
      const [rating] = await db.query(
        "SELECT COALESCE(AVG(rating), 0) AS avgRating FROM ratings WHERE store_id = ?",
        [user.id]
      );
      user.avgRating = rating[0].avgRating;
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching user details" });
  }
};
