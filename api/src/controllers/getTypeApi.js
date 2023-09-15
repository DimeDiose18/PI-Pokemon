const axios = require("axios");
const { Type } = require("../db");

const addTypeDb = async () => {
  const url = "https://pokeapi.co/api/v2/type";

  try {
    const allTypes = await Type.findAll();
    if (allTypes.length > 0) return null; 
    const apiType = await axios.get(url);
    const dataApiType = apiType.data.results;
    console.log("dataApiType OK!");

     dataApiType.map(async (e) => {
      let typeImg = `https://typedex.app/app/images/ui/types/dark/${e.name}.svg`;
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

const getTypeApi = async () => {
  const result = await Type.findAll();
  return result;
};

module.exports = {
  getTypeApi,
};
