//es el verde el del scrool
//vista de cada card de pokemon
import React, { useEffect, useState } from "react";
import styles from "./SideBarLeft.module.css";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPokemons } from "../../redux/actions.js";
import PokemonCard from "../PokemonCard/PokemonCard";
import Loader from "../../components/Home/Loader.jsx";
import Pagination from "../Pagination/Pagination.jsx";


const SideBarLeft = () => {
  const [pokemones, setPokemones] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchPage, setSearchPage] = useState(currentPage);

  const dispatch = useDispatch();

  useEffect(()=> {
    setIsLoading(true)
    if(isLoading){
    dispatch(fetchPokemons(searchPage))
    .then((response) => {
      const data = response.payload;
      setPokemones(data)
    }).then(()=>{
      setIsLoading(false)
    }).catch((error) => {
      console.error("Error al obtener los pokemons", error)
    })
  }
  }, [dispatch, searchPage, isLoading]);

  useEffect(() => {
    !isLoading && setIsLoading(false);
  }, [isLoading]);

  //manejador para cambiar las paginas
  const handlePageChange = (currentPage) => {
    setCurrentPage(currentPage);
    setSearchPage(currentPage);
    setPokemones([]); //vacio los pokemons existentes para volver a mostrar el loader
  };

  const totalPokemons = 1281;
  const totalPages = Math.ceil(totalPokemons / 12);


    return (
        <div>
            <h1>Pokemons:</h1>
            {isLoading ? (
              <Loader />
            ) : (
              pokemones?.map((pokemon) => (
                <Link key={pokemon.id} to={`/home/pokemons/${pokemon.name}`} className={styles.links}>
                 <PokemonCard key={pokemon.id} pokemon={pokemon} /> 
                </Link>
            )) 
            )}

            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              isLoading={isLoading}
              onPageInputChange = {value => setSearchPage(value)}
            />
            
       </div>
    )
};

export default SideBarLeft;