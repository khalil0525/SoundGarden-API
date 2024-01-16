// All of the models and associations go here to be exported out to be use throughout our app.
// This way we don't have some weird functionality outside of what we've defined here and our model files

//Associations
// * 1 - Many
// Many - Many
// * 1 - 1
//aaaaa

const User = require("./user");
const Song = require("./song");

User.hasMany(Song, {
  foreignKey: "userId",
});
Song.belongsTo(User);

Song.belongsToMany(User, { through: "SongDownload" });
User.belongsToMany(Song, { through: "SongDownload" });

//associations go here

//Export the models here. You can now target ./db/models to import any model into another place outside the DB folder

module.exports = { User, Song, SongDownload };
