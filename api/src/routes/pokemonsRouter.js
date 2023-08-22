const { Router } = require("express");
const getApiInfo = require("../controllers/getPokemons");

const pokemonsRouter = Router();
//GET /pokemons
pokemonsRouter.get("/", async (req, res) => {
  try {
    const allPokemons = await getApiInfo();
    res.json(allPokemons);
  } catch (error) {
    res.status(500).json({ "error": "No hay pokemons" });
  }
});
// GET /pokemons/id
pokemonsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const ID = parseInt(id);
  const allPokemonsById = await getApiInfo();
    if(ID) {
      const detailPokemon = allPokemonsById.find(pokemon => pokemon.id === ID);
      res.json(detailPokemon).status(200, console.log("pokemon encontrado"))
    } else{
      res.status(500, console.log("pokemon no encontrado"));
    }
  } 
);
// GET pokemons/name?=
pokemonsRouter.get("/", function (req, res) {
  const {name} = req.body;
  res.send(`Estoy en la ruta de ${name}`);
});

pokemonsRouter.post("/", (req, res) => {

  res.send("Estoy en la ruta de Post");
});

module.exports = pokemonsRouter;
