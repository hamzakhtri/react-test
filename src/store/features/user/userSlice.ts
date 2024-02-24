import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [] as { username: string; email: string; password: string }[],
    currentUser: null as unknown
};

export const userSlice = createSlice({

    name: "user",
    initialState,

    reducers: {
        addUser: (state, action) => {
            state.users.push(action.payload);
        },
        addCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        }
    }
})


export const { addUser, addCurrentUser } = userSlice.actions;
export default userSlice.reducer;