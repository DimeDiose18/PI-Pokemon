const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("pokemon", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { isUrl: true },
      defaultValue: "https://i.imgur.com/R1WxMTs.png",
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 255,
      }
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 200,
      }
    },
    specialAttack: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 200,
      }
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 250,
      }
    },
    specialDefense: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 250,
      }
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 200,
      }
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
