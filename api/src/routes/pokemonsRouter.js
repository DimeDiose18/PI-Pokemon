const { Router } = require("express");
const { Pokemon, Type } = require("../db");
const { default: axios } = require("axios");
const filterInfo = require("../utils/filterInfo");
const savePokemon = require("../controllers/savePokemons");
const { POKEMONS_API_URL } = require("../constants");

const pokemonsRouter = Router();
//GET /pokemons
pokemonsRouter.get("/", async (req, res) => {
  try {
    const allPokemons = await await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["name", "image"],
        through: {
          attributes: [],
        },
      },
    });
    res.status(200).json(allPokemons);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//GET /pokemons/savedpokemons

const sendPokemonsInBatches = async (pokemonData) => {
  console.log(pokemonData.length, "post");
  const batchSize = 200;
  const URL = POKEMONS_API_URL;
  const batchesToProcess = [];

  for (let i = 0; i < pokemonData.length; i += batchSize) {
    const batch = pokemonData.slice(i, i + batchSize);
    batchesToProcess.push(batch);
  }

  for (const batch of batchesToProcess) {
    const postPromises = batch.map(async (pokemonInfo) => {
      try {
        pokemonInfo
        const response = await axios.post(URL, pokemonInfo);
        return response.data;
      } catch (error) {
        console.error("Error al guardar el Pokemon:", error.message);
        return null;
      }
    });

    const batchResponses = await Promise.all(postPromises);
    console.log(batchResponses);
  }
};

pokemonsRouter.get("/savePokemons", async (req, res) => {
  try {
    const pokemonsReady = await savePokemon();
    console.log(pokemonsReady.length, "get");
    const invalidPokemons = [];

    pokemonsReady.forEach((pokemon) => {
      if (!isValidPokemon(pokemon)) {
        invalidPokemons.push(pokemon);
        console.log("Registro inválido:", pokemon);
      }
    });
    const validPokemons = pokemonsReady.filter((pokemon) =>
      isValidPokemon(pokemon)
    );

    await sendPokemonsInBatches(validPokemons);

    res.status(200).json(validPokemons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

function isValidPokemon(pokemon) {
  return pokemon && pokemon.name !== null && true;
}

// GET /pokemons/name

pokemonsRouter.get("/name", async (req, res) => {
  const { name } = req.query;
  console.log("kmdkf");
  const findPokemonDB = async () => {
    const data = await Pokemon.findOne({
      where: { name: name.toLowerCase() },
      include: {
        model: Type,
        attributes: ["name", "image"],
        through: {
          attributes: [],
        },
      },
    });
    return data;
  };
  const data = await findPokemonDB();

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
    image,
    altImage,
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
      image,
      altImage,
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
    const { detail } = error.parent;
    res.status(500).json(detail);
  }
});

module.exports = pokemonsRouter;
