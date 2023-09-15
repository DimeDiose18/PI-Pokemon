export const orderByAZ = (data, order, typeOrder) => {
  return data.sort((a, b) => {
    let valueA, valueB;

    if (typeOrder === "name" || typeOrder === "attack") {
      valueA = a[typeOrder];
      valueB = b[typeOrder];
    } else {
      throw new Error("Invalid attribute");
    }

    if (typeof valueA === "string" && typeof valueB === "string") {
      const compareResult =
        order === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      return compareResult;
    } else if (typeof valueA === "number" && typeof valueB === "number") {
      return order === "asc" ? valueA - valueB : valueB - valueA;
    } else {
      throw new Error("Unsupported data types");
    }
  });
};

export const filterByType = (data, selectedType) => {
  return data.filter((pokemon) => {
    const foundType = pokemon.types.find((type) => {
      return type.name === selectedType;
    });

    return foundType !== undefined;
  });
};

export const searchByName = (data, searchTerm) => {
  const filteredPokemonName = data?.filter((pokemon) =>
    pokemon.name.includes(searchTerm)
  );
  return filteredPokemonName;
};
