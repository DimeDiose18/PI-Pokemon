import React, { useEffect, useState } from "react";
import styles from "./SideBarLeft.module.css";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllTypes, fetchPokemons } from "../../redux/actions.js";
import PokemonCard from "../PokemonCard/PokemonCard";
import Loader from "../../components/Home/Loader.jsx";
import Pagination from "../Pagination/Pagination.jsx";
import FiltersBar from "../Filters/FiltersBar";

const SideBarLeft = ({ searchTerm }) => {
  const [pokemones, setPokemones] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState();
  const [allTypes, setAllTypes] = useState();
  const [selectedType, setSelectedType] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState({
    order: "",
    typeOrder: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);

    if (isLoading) {
      const dispatchPokemons = (
        currentPage,
        selectedType,
        selectedOrder,
        searchTerm
      ) => {
        
        dispatch(
          fetchPokemons({
            currentPage,
            selectedType,
            selectedOrder,
            searchTerm,
          })
        )
          .then((response) => {
            const data = response.payload.data;
            const totalPokemons = response.payload.dataLength;
            setTotalPages(Math.ceil(Math.floor(totalPokemons) / 12));
            setPokemones(data);
          })
          .then(() => {
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("Error when getting pokemons", error);
          });
      };

      if (selectedType === "All") {
        dispatchPokemons(currentPage, "", selectedOrder, searchTerm);
      } else {
        dispatchPokemons(currentPage, selectedType, selectedOrder, searchTerm);
      }
    }
  }, [
    dispatch,
    currentPage,
    isLoading,
    selectedType,
    allTypes,
    selectedOrder,
    searchTerm,
  ]);

  
  useEffect(() => {
    !isLoading && setIsLoading(false);
  }, [isLoading]);

  const handlePageChange = (currentPage) => {
    setCurrentPage(currentPage);
    setPokemones([]); 
  };


  useEffect(() => {
    dispatch(fetchAllTypes(allTypes)).then((response) => {
      const data = response.payload;
      setAllTypes(data);
    });
  }, [dispatch]);

  return (
    <div>
      <div>
        <FiltersBar
          allTypes={allTypes}
          setSelectedType={setSelectedType}
          setSelectedOrder={setSelectedOrder}
          selectedOrder={selectedOrder}
        />
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        pokemones?.map((pokemon) => (
          <Link
            key={pokemon?.id}
            to={`/home/pokemons/${pokemon?.name}`}
            className={styles.links}
          >
            <PokemonCard key={pokemon?.id} pokemon={pokemon} />
          </Link>
        ))
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        isLoading={isLoading}
      />
    </div>
  );
};

export default SideBarLeft;
