const Store = require("../models/store");
const Rating = require("../models/rating");
const { Sequelize } = require("sequelize");

exports.getStores = async (req, res) => {
  const stores = await Store.findAll({
    include: [{ model: Rating, attributes: [] }],
    attributes: {
      include: [[Sequelize.fn("AVG", Sequelize.col("Ratings.rating")), "avgRating"]],
    },
    group: ["Store.id"],
  });
  res.json(stores);
};
