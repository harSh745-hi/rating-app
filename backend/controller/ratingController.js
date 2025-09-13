const Rating = require("../models/rating");

exports.rateStore = async (req, res) => {
  const { rating } = req.body;
  const { id } = req.params; // storeId
  const userId = req.user.id;

  let existing = await Rating.findOne({ where: { userId, storeId: id } });
  if (existing) {
    existing.rating = rating;
    await existing.save();
    return res.json(existing);
  }
  const newRating = await Rating.create({ rating, storeId: id, userId });
  res.json(newRating);
};
