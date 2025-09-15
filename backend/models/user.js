const db = require("../config/databse");

// Create new user
const createUser = async (name, email, hashedPassword, address, role) => {
  const [result] = await db.query(
    "INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)",
    [name, email, hashedPassword, address || "", role]
  );
  return { id: result.insertId, name, email, address, role };
};

// Find user by email
const findByEmail = async (email) => {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
};

// Find user by id
const findById = async (id) => {
  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  return rows[0];
};

module.exports = { createUser, findByEmail, findById };
