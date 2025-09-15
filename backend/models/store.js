const db = require("../config/databse");

// Insert new store
const addStore = async (name, email, address, ownerId) => {
  const [result] = await db.query(
    "INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)",
    [name, email, address, ownerId]
  );
  return { id: result.insertId, name, email, address, ownerId };
};

// Get all stores with average rating
const getStoresWithAvgRating = async () => {
  const [rows] = await db.query(`
    SELECT 
      s.id,
      s.name,
      AVG(r.rating) AS avgRating
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      GROUP BY s.id
  `);
  return rows;
};

// Get all stores with owner info
const getStoresWithOwner = async () => {
  const [rows] = await db.query(`
    SELECT 
      s.id, s.name, s.email, s.address, 
      u.name AS ownerName, u.email AS ownerEmail
      FROM stores s
      LEFT JOIN users u ON s.owner_id = u.id
  `);
  return rows;
};

module.exports = { addStore, getStoresWithAvgRating, getStoresWithOwner };
