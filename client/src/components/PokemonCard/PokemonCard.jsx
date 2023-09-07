import styles from "./PokemonCard.module.css";

const PokemonCard = ({ pokemon }) => {
  return (
    <div className={styles.cardContainer} key={pokemon.id}>
      <img className={styles.pokemonImage} src={pokemon.img} alt="pokemon" />

      <div className={styles.mainContainer}>
        <div className={styles.nameContainer}>
          <h1 className={styles.pokemonName}>{pokemon.name}</h1>
        </div>
        <div className={styles.typesContainer}>
          {pokemon.types.map((e) => (
            <div key={e.name} className={styles.type}>
              <p className={styles.pType}>{e.name}</p>
              <img src={e.img} className={styles.imgType} alt="pokemon types" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
