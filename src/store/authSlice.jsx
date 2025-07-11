import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
};
const authSlice = createSlice({
    // It is a function that creates a slice of the Redux store. A slice is a piece of the state that is managed by a reducer.
    name: "auth",// Name of the slice, used to identify the slice in the Redux
    initialState,// Initial state of the slice, which is an object with isAuthenticated, user, and token properties
    reducers: {
        login : (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },// This action can be used to update the user information
        setToken: (state, action) => {
            state.token = action.payload;
        }, // This action can be used to update the token
        clearAuth: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
        }, // This action can be used to clear the authentication state
    }, 
})
export const authReducer = authSlice.reducer
export const { login, logout, setUser, setToken, clearAuth } = authSlice.actions
