import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: []
};

const userSlice = createSlice({
    name: "users", //nombre del pedazo del estado global
    initialState,
    reducers: {
        getUsers: (state, action) => {
            const name = action.payload;
            state.name = name;
        }
    }
})

export const {getUsers} = userSlice.actions;
export default userSlice.reducer;