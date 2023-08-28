const axios = require("axios");
const { Type } = require("../db");

// Agg los types de la api a la base de datos, antes de mandarlo a la ruta
const addTypeDb = async () => {
  const url = "https://pokeapi.co/api/v2/type";

  try {
    const allTypes = await Type.findAll();
    if (allTypes.length > 0) return null; //verifico que este no este vacia la db
    const apiType = await axios.get(url);
    const dataApiType = apiType.data.results;
    console.log("dataApiType OK!");

     dataApiType.map(async (e) => {
      let typeImg = `https://typedex.app/app/images/ui/types/dark/${e.name}.svg`;
      console.log(`Type: ${e.name}, Image: ${typeImg}`);

      await Type.create({
        name: e.name,
        image: typeImg,
      });
    }); 

  } catch (error) {
    console.error(error);
  }
};
addTypeDb();

// Traigo los datos de la api y esos se conectan con la rutaa
const getTypeApi = async () => {
  const result = await Type.findAll();
  return result;
};

module.exports = {
  getTypeApi,
};
