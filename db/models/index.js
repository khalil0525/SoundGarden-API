// All of the models and associations go here to be exported out to be use throughout our app.
// This way we don't have some weird functionality outside of what we've defined here and our model files

//Associations
// * 1 - Many
// Many - Many
// * 1 - 1

const User = require("./user");
const Song = require("./song");
const SongDownload = require("./songDownload");

User.hasMany(Song, {
  foreignKey: "userId",
});
Song.belongsTo(User);

Song.hasMany(SongDownload, {
  foreignKey: {
    name: "songId",
    allowNull: false,
  },
});
SongDownload.belongsTo(Song, {
  foreignKey: {
    name: "songId",
    allowNull: false,
  },
});

Song.hasMany(SongDownload, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
});
SongDownload.belongsTo(Song, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
});

//associations go here

//Export the models here. You can now target ./db/models to import any model into another place outside the DB folder

module.exports = { User, Song, SongDownload };
