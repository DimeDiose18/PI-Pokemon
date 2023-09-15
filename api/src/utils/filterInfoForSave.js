function filterInfoForSave(data) {
  try {
    if (!data) {
      console.log(data);
      throw new Error("Los datos de entrada son nulos o indefinidos.");
    }
    if (
      data.id &&
      data.name &&
      data.sprites &&
      data.sprites.versions &&
      data.sprites.versions["generation-v"] &&
      data.sprites.versions["generation-v"]["black-white"] &&
      data.sprites.versions["generation-v"]["black-white"].animated &&
      data.sprites.other &&
      data.sprites.other["official-artwork"] &&
      data.types &&
      data.types.length > 0 &&
      data.stats &&
      data.stats.length >= 6 &&
      data.height &&
      data.weight
    ) {
      return {
        name: data.name,
        image:
          data.sprites.versions["generation-v"]["black-white"].animated
            .front_default,
        altImage: data.sprites.other["official-artwork"].front_default,
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        specialAttack: data.stats[3].base_stat,
        defense: data.stats[2].base_stat,
        specialDefense: data.stats[4].base_stat,
        speed: data.stats[5].base_stat,
        height: data.height,
        weight: data.weight,
        types: data.types.map((e) => e.type.name),
      };
    } else {
      throw new Error("Los datos de entrada no tienen la estructura esperada.");
    }
  } catch (error) {
    console.error("filterInfo", error.message);
  }
}

module.exports = filterInfoForSave;
