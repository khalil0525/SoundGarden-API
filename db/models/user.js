const Sequelize = require("sequelize");
const db = require("../db");
const crypto = require("crypto");

const User = db.define("user", {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: true,
    validate: {
      isEmail: true,
    },
  },
  verified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },

  password: {
    type: Sequelize.STRING,
    validate: {
      min: 6,
    },
    allowNull: false,
    get() {
      return () => this.getDataValue("password");
    },
  },
  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue("salt");
    },
  },
});

/* Special Functionality */

// 1. 1st thing we do!
User.createSalt = function () {
  return crypto.randomBytes(16).toString("base64");
};

User.prototype.correctPassword = function (password) {
  return User.encryptPassword(password, this.salt()) === this.password();
};

User.encryptPassword = function (plainPassword, salt) {
  return crypto
    .createHash("RSA-SHA256")
    .update(plainPassword)
    .update(salt)
    .digest("hex");
};

const setSaltAndPassword = (user) => {
  if (user.changed("password")) {
    user.salt = User.createSalt();
    user.password = User.encryptPassword(user.password(), user.salt());
  }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
User.beforeBulkCreate((users) => {
  users.forEach(setSaltAndPassword);
});

module.exports = User;
