const { Router } = require("express");
const { Pokemon, Type } = require("../db");
const getAllPokemons = require("../controllers/getAllPokemons");
const { default: axios } = require("axios");
const filterInfo = require("../utils/filterInfo");

const pokemonsRouter = Router();
//GET /pokemons
pokemonsRouter.get("/", async (req, res) => {
  const { page } = req.query;
  try {
    const allPokemons = await getAllPokemons(page);
    res.status(200).json(allPokemons);
  } catch (error) {
    res.status(500).json({ error: "No hay pokemons" });
  }
});
// GET /pokemons/name

pokemonsRouter.get("/name", async (req, res) => {
  const { name } = req.query;
  const allPokemons = await axios
    .get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
    .then((response) => response.data)
    .catch((error) => console.error(error));

  const findPokemonDB = async () => {
    const data = await Pokemon.findAll({
      where: { name: name.toLowerCase() },
    });
    return data;
  };

  const data = allPokemons ? filterInfo(allPokemons) : await findPokemonDB();

  try {
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "Not Found Pokemon" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// GET /pokemons/id

pokemonsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const allPokemons = await axios
    .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((response) => response.data);
  const data = filterInfo(allPokemons);
  try {
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "Not Found Pokemon" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

//POST /pokemons

pokemonsRouter.post("/", async (req, res) => {
  const {
    name,
    img,
    hp,
    attack,
    specialAttack,
    defense,
    specialDefense,
    speed,
    height,
    weight,
    types,
  } = req.body;
  try {
    let newPokemon = await Pokemon.create({
      name,
      img,
      hp,
      attack,
      specialAttack,
      defense,
      specialDefense,
      speed,
      height,
      weight,
    });

    let typeDB = await Type.findAll({
      where: { name: types },
    });

    newPokemon.addType(typeDB);

    res.status(200).json({ message: "El pokemon ha sido creado con exito" });
  } catch (error) {
    res.status(500).json({ message: "Error de servidor", error });
  }
});

module.exports = pokemonsRouter;
