import { createSlice } from "@reduxjs/toolkit";
import { fetchPokemons } from "../actions";

const initialState = {
  pokemons: [],
  pokemonsDetails: null,
  loading: false,
  error: null,
  types: [],
  createPokemon: ""
};

const pokemonSlice = createSlice({
  name: "pokemons", 
  initialState,
  reducers: {
    getPokemons: (state, action) => {
      state.pokemons = action.payload;
    },
    setPokemonDetails: (state, action) => {
      state.pokemonsDetails = action.payload;
    },
    getTypes: (state, action) => {
      state.types = action.payload;
    },
    filterType: (state, action) => {
      const copy = [...state.pokemons];

      const typeFiltered =
        action.payload === "All"
          ? copy
          : copy.filter((e) =>
              e.types.some((type) => type.name === action.payload)
            );

        if(typeFiltered.length > 0) alert("There are no pokemons of that type");
        return {
            ...state,
            pokemons: typeFiltered,
        }},
        createPokemon: (state, action) => {
          state.createPokemon = action.payload
        }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemons = action.payload;
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default pokemonSlice.reducer;
export const { getPokemons, setPokemonDetails, getTypes, typeFiltered, cleanDetail,createPokemon } =
  pokemonSlice.actions;
