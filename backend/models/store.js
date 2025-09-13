const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");

const Store = sequelize.define("Store", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING },
  address: { type: DataTypes.STRING(400) },
});

Store.belongsTo(User, { as: "owner", foreignKey: "ownerId" });

module.exports = Store;
