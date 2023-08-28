const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("pokemon", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "https://i.imgur.com/R1WxMTs.png",
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    specialAttack: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    specialDefense: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    height: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      comment: "Height of the pokemon in meters",
    },
    weight: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      comment: "Weight of the pokemon in kilograms."
    },

    // nose aun pa que me sirve
    createdPokemon: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  });
};
