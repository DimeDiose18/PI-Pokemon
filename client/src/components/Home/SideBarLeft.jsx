//es el verde el del scrool
//vista de cada card de pokemon
import { useSelector } from "react-redux";
import Loader from "../Home/Loader";
import PokemonCard from "../PokemonCard/PokemonCard";

const SideBarLeft = () => {
  const pokemons = useSelector((state) => state.pokemons.pokemons);

  if (!pokemons.length) {
    return <Loader />;
  } else {
    return (
      <div>
        <h1>Pokemons:</h1>
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    );
  }
};

export default SideBarLeft;
