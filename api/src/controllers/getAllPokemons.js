const getApiInfo = require("./getPokemons");
const getDbInfo = require("./getDbInfo");

const getAllPokemons = async (page) => {
  const apiInfo = await getApiInfo(page);
  const dbInfo = await getDbInfo();
  const allPokemons = apiInfo.concat(dbInfo);
  if (apiInfo.length > 10) {
    return apiInfo;
  }
  if (apiInfo.length < 10 && apiInfo.length) {
    return allPokemons;
  }
  if (!apiInfo.length) {
    return dbInfo;
  }
};

module.exports = getAllPokemons;
