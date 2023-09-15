import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { POKEMONS_API_URL, TYPES_API_URL } from "../constants";
import { filterByType, orderByAZ, searchByName } from "../services/filters";


export const fetchPokemons = createAsyncThunk(
  "pokemons/fetchPokemons",
  async ({ currentPage, selectedType, selectedOrder, searchTerm = "" }) => {
    console.log(searchTerm);
    const URL = POKEMONS_API_URL;
    const response = await axios.get(URL);
    const data = response.data;
    let filterData = [];
    const { order, typeOrder } = selectedOrder;

    if (selectedType.length) {
      filterData = filterByType(data, selectedType);
      if (order.length && typeOrder.length) {
        filterData = orderByAZ(filterData, order, typeOrder);
      }
      if (searchTerm.length) {
        filterData = searchByName(filterData, searchTerm);
      }
    } else {
      filterData = data;
      if (order.length && typeOrder.length) {
        filterData = orderByAZ(filterData, order, typeOrder);
      }
      if (searchTerm.length) {
        filterData = searchByName(filterData, searchTerm);
      }
    }
    try {
      const itemsPerPage = 12;
      const pageDesire = currentPage;

      const startIndex = (pageDesire - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const page = filterData.slice(startIndex, endIndex);
      return { data: page, dataLength: filterData.length };
    } catch (error) {
      throw error.message;
    }
  }
);

export const fetchPokemonDetails = createAsyncThunk(
  "pokemons/fetchPokemonDetails",
  async (pokemonName) => {
    const URL = `${POKEMONS_API_URL}/name?name=${pokemonName}`;
    try {
      const response = await axios.get(URL);
      return response.data;
    } catch (error) {
      throw error.message;
    }
  }
);

export const fetchAllTypes = createAsyncThunk(
  "pokemons/fetchAllTypes",
  async () => {
    const URL = TYPES_API_URL;
    try {
      const response = await axios.get(URL);
      return response.data;
    } catch (error) {
      throw error.message;
    }
  }
);

export const createPokemon = createAsyncThunk(
  "pokemons/createPokemons",
  async (data) => {
    const URL = POKEMONS_API_URL;
    const createdPokemon = await axios
      .post(URL, data)
      .then((response) => response.data)
      .catch((error) => console.error(error));
    alert("New pokemon created!");
    return createdPokemon;
  }
);
