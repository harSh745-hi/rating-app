const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");
const Store = require("./store");

const Rating = sequelize.define("Rating", {
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 5 },
  },
});

User.hasMany(Rating, { foreignKey: "userId" });
Store.hasMany(Rating, { foreignKey: "storeId" });
Rating.belongsTo(User, { foreignKey: "userId" });
Rating.belongsTo(Store, { foreignKey: "storeId" });

module.exports = Rating;
