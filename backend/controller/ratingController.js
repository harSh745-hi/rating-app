const Rating = require("../models/rating");

exports.rateStore = async (req, res) => {
  try {
    const { rating } = req.body;
    const storeId = req.params.id;
    const userId = req.user.id;

    // Check if user already rated this store
    const existing = await Rating.findUserRating(userId, storeId);

    if (existing) {
      await Rating.updateRating(rating, userId, storeId);
      return res.json({ msg: "Rating updated", rating });
    }

    // Insert new rating
    const newRating = await Rating.insertRating(rating, userId, storeId);
    res.json(newRating);
  } catch (err) {
    console.error("RateStore Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
