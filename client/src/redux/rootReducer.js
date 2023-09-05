import { combineReducers } from '@reduxjs/toolkit';

import pokemonReducer from './reducers/pokemonReducer.js';
import userReducer from './reducers/userReducer.js';

const rootReducer = combineReducers({
    pokemons: pokemonReducer,
    user: userReducer,
});

export default rootReducer;