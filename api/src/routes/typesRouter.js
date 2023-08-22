const {Router} = require('express');

const typesRouter = Router();

typesRouter.get('/types', function(req,res){
    res.send("Estoy en el /types de pokemons")
});

module.exports = typesRouter;