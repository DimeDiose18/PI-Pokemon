import { createSlice } from "@reduxjs/toolkit";
import { fetchPokemons } from "../actions"

const initialState = {
    pokemons: [],
    pokemonsDetails: null,
    loading: false,
    error: null,
};

const pokemonSlice = createSlice({
    name: "pokemons", //nombre del pedazo del estado global
    initialState,
    reducers: {
        getPokemons: (state, action) => {
            state.pokemons = action.payload;
            //almacena todos los pokemons
        },
        setPokemonDetails: (state, action) => {
            state.pokemonsDetails = action.payload;
            //actualiza los detalles de cada pokemon
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchPokemons.pending, (state)=> {
            state.loading = true;
        })
        .addCase(fetchPokemons.fulfilled, (state, action)=> {
            state.loading = false;
            state.pokemons = action.payload;
        })
        .addCase(fetchPokemons.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.error.message;
        })

    }
})

export default pokemonSlice.reducer;
export const { getPokemons, setPokemonDetails} = pokemonSlice.actions;
