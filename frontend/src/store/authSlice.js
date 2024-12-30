import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: null,
    accessToken: null,
    refreshToken: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            const { email = null, accessToken = null, refreshToken = null } = action.payload;
            state.email = email;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
        },
        logout: (state) => {
            state.email = null;
            state.accessToken = null;
            state.refreshToken = null;
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
