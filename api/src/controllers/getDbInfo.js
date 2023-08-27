const { Pokemon, Type } = require('../db');

// Traigo todos los pokemons creados desde base de datos de pokemon, y que de una vez incluya su type
const getDbInfo = async () => {
    return await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['name'],
            through: {
                attributes:[],
            },
        }
    });
};

module.exports = getDbInfo;