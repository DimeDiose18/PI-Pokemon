import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

export const fetchPokemons = createAsyncThunk('pokemons/fetchPokemons', async (currentPage) => {
  console.log("cp",currentPage);
    const URL = `http://localhost:3001/pokemons?page=${currentPage}`;
  try {
      const response = await axios.get(URL);
      return response.data;
    } catch (error) {
      throw error;
    }
  });


  export const fetchPokemonDetails = createAsyncThunk('pokemons/fetchPokemonDetails', async (pokemonName) => {
    const URL = `http://localhost:3001/pokemons/${pokemonName}`;
    try {
      const response = await axios.get(URL);
      return response.data;
    } catch (error) {
      throw error;
    }
  });
  