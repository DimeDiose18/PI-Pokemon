import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: []
};

const userSlice = createSlice({
    name: "users", 
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