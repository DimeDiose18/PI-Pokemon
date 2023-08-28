const axios = require("axios");
const filterInfo = require("../utils/filterInfo")

// Traigo los datos de la api

const getApiInfo = async (page) => {
  const offset = page * 12
  console.log(offset);
  const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=12`;
  const data = await axios.get(url).then(response => response.data.results)
  const allPokemons = data.map(async (e)=> {
    const  pokemonURL = e.url
    const pokemon = await axios.get(pokemonURL).then(response => response.data)
    return filterInfo(pokemon)
  })
  const resolvedPromise = Promise.all(allPokemons).then(values=>{
    return values;
  }).catch(e => console.error(e))
    
  
  return resolvedPromise;

}
module.exports = getApiInfo;
