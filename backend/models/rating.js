const db = require("../config/databse");

// Insert or update rating
const upsertRating = async (userId, storeId, rating) => {
  const [existing] = await db.query(
    "SELECT * FROM ratings WHERE user_id = ? AND store_id = ?",
    [userId, storeId]
  );

  if (existing.length > 0) {
    await db.query(
      "UPDATE ratings SET rating = ? WHERE user_id = ? AND store_id = ?",
      [rating, userId, storeId]
    );
    return { ...existing[0], rating };
  }

  const [result] = await db.query(
    "INSERT INTO ratings (user_id, store_id, rating) VALUES (?, ?, ?)",
    [userId, storeId, rating]
  );

  return { id: result.insertId, userId, storeId, rating };
};

// Get ratings for a store
const getRatingsByStore = async (storeId) => {
  const [rows] = await db.query("SELECT * FROM ratings WHERE store_id = ?", [
    storeId,
  ]);
  return rows;
};

module.exports = { upsertRating, getRatingsByStore };
