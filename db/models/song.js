const Sequelize = require("sequelize");
const db = require("../db");

const Song = db.define("song", {
  title: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false,
  },
  duration: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      isFloat: true,
      min: 0.0,
    },
  },
  fileKey: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  fileURL: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  genre: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  photoUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  privacy: {
    type: Sequelize.ENUM,
    allowNull: false,
  },
});

//module.exports = Song;

DataTypes.ENUM("value", "another value");
DataTypes.ENUM(["value", "another value"]);
DataTypes.ENUM({
  values: ["value", "another value"],
});
