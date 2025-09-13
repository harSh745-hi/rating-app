const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  name: { type: DataTypes.STRING(60), allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING(400) },
  role: {
    type: DataTypes.ENUM("ADMIN", "NORMAL_USER", "STORE_OWNER"),
    defaultValue: "NORMAL_USER",
  },
});

module.exports = User;
