const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "type",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        unique: true,
      },

      image: {
      type: DataTypes.STRING,
      allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
