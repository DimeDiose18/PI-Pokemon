function filterInfo(data) {
  if (data) {
    return {
      id: data.id,
      name: data.name,
      img: data.sprites.versions["generation-v"]["black-white"].animated.front_default,
      types: data.types.map((e) => {
        // que de una vez me traiga los types de cada pokemon y que me agarre un icono bonito para cada uno.
        return {
          name: e.type.name,
          img: `https://typedex.app/app/images/ui/types/dark/${e.type.name}.svg`,
        };
      }),
      hp: data.stats[0].base_stat,
      attack: data.stats[1].base_stat,
      specialAttack: data.stats[3].base_stat,
      defense: data.stats[2].base_stat,
      specialDefense: data.stats[4].base_stat,
      speed: data.stats[5].base_stat,
      height: data.height,
      weight: data.weight,
    };
  }
}

module.exports = filterInfo;
