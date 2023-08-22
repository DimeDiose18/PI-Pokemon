//const infoPokemons = await axios.get(url)
//.then(data.results)

const infoPokemons = async () => {
  await axios.get(url).then((response) => console.log(response.data.results));
};
