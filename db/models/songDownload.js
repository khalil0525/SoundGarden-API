const SongDownload = db.define(
  "SongDownload",
  {
    songId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        name: "userId_songId",
        fields: ["userId", "songId"],
        unique: true,
      },
    ],
  }
);
