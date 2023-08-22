const { Pokemon, Type } = require("../db.js");
const axios = require("axios");

// Traigo los datos de la api

const getApiInfo = async () => {
  try {
    const url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1200";
    const pokemons = [];
    const pokemonCount = 1200;

    const infoPokemons = await axios.get(url);

    const pokemonsApi = infoPokemons.data.results
    pokemonsApi.forEach((e) => {
      //aqui por cada pokemon nos devuelva el nombre y su url(donde estan todos sus datos)
      if (pokemons.length < pokemonCount) {
        pokemons.push({
          name: e.name,
          url: e.url,
        });
      }
    });


    const pokemonsWithAttributes = Promise.all(
      pokemons.map(async (e) => {
        let onePokemon = await axios.get(e.url); //que me recorra toda la lista de urls y por cada uno me de un pokemon y retorne cada atributo que solicito
        const poke = onePokemon.data;
        return {
          id: poke.id,
          name: poke.name,
          img: poke.sprites.versions['generation-v']['black-white'].animated.front_default,
          types: poke.types.map((e) => {
            // que de una vez me traiga los types de cada pokemon y que me agarre un icono bonito para cada uno.
            return {
              name: e.type.name,
              img: `https://typedex.app/app/images/ui/types/dark/${e.type.name}.svg`,
            };
          }),
          hp: poke.stats[0].base_stat,
          attack: poke.stats[1].base_stat,
          specialAttack: poke.stats[3].base_stat,
          defense: poke.stats[2].base_stat,
          specialDefense: poke.stats[4].base_stat,
          speed: poke.stats[5].base_stat,
          height: poke.height,
          weight: poke.weight,
        };
      })
    );
    return pokemonsWithAttributes;
  } catch (error) {
    console.log("error:", error);
  }
};

module.exports = getApiInfo;
