const Store = require("../models/store");

// Add new store
exports.addStore = async (req, res) => {
  try {
    const { name, email, address } = req.body;
    const ownerId = req.user.id;

    const newStore = await Store.addStore(name, email, address, ownerId);

    res.status(201).json(newStore);
  } catch (err) {
    console.error("AddStore Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get all stores with average rating
exports.getStoresWithAvgRating = async (req, res) => {
  try {
    const stores = await Store.getStoresWithAvgRating();
    res.json(stores);
  } catch (err) {
    console.error("GetStoresWithAvgRating Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get all stores with owner info
exports.getStoresWithOwner = async (req, res) => {
  try {
    const stores = await Store.getStoresWithOwner();
    res.json(stores);
  } catch (err) {
    console.error("GetStoresWithOwner Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
