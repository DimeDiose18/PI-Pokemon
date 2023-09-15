const axios = require("axios");
const filterInfoForSave = require("../utils/filterInfoForSave");

const savePokemon = async () => {
  try {
    const batchSize = 250;
    const totalPokemons = 1281;
    const batches = Math.ceil(totalPokemons / batchSize);

    const allPokemons = [];

    for (let batch = 0; batch < batches; batch++) {
      const offset = batch * batchSize;
      const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${batchSize}`;

      const data = await axios
        .get(url)
        .then((response) => response.data.results);

      const pokemonPromises = data.map(async (e) => {
        const pokemonURL = e.url;
        const pokemon = await axios
          .get(pokemonURL)
          .then((response) => response.data)
          .catch((error) => console.error(error.message));
        console.log(pokemon, "pokemon");
        return filterInfoForSave(pokemon);
      });

      const batchPokemons = await Promise.all(pokemonPromises);
      allPokemons.push(...batchPokemons);
    }
    return allPokemons;
  } catch (error) {
    console.error(error);
  }
};

module.exports = savePokemon;
