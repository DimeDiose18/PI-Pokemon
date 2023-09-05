import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pokemons: [],
    pokemonsDetails: null,
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
        }

    }
})

export const {getPokemons, setPokemonDetails} = pokemonSlice.actions;
export default pokemonSlice.reducer;