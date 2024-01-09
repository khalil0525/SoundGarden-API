const Sequelize = require("sequelize");
const db = require("../db");
const Song = db.define(
  "song",
  {
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
        max: 1800.0,
      },
    },
    fileKey: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    fileURL: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    genre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    photoUrl: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
    },
    permalink: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    privacy: {
      type: Sequelize.ENUM({
        values: ["PRIVATE", "PUBLIC"],
      }),
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        name: "userId_songPermalink",
        fields: ["userId", "permalink"],
        unique: true,
      },
    ],
  }
);

module.exports = Song;
