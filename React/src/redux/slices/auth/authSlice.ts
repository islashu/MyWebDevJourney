import {createSlice} from '@reduxjs/toolkit';

/*
 * In the redux, there can be many books to one container, a authSlice essentially is a book contain all auth related state that
 * you might want. Alternately, you can create a paginationSlice, which represent a history of the auth traversal.
 * This is essentially a containerized state of the entire application
 * */
export const authSlice = createSlice({
    name: 'authSlice',
    // initial value when initialising the authSlice
    initialState: {
        username: '',
        isAuthenticated: false,
        accessToken: '',
        refreshToken: '',
        isAdmin: false
    },
    // This are the functions that can alter the state store in the books
    reducers: {
        // All functions will have to include (state, action)
        /* Impt!
         * I will not be assigning or altering any values here, the code for any function in here will always be state.value = action.payload
         * This is because redux does not deal well with types and works with plain objects only. So changing it here will require alot of converting class and it is excess.
         * Instead, we will have an intermediary service layer that does the conversion to the require object and state and dispatches it to redux
         * */

        /* update JWT token */
        setAccessToken: (state, action) => {
            // This state.value refers to the entire initialState object above and will overwrite it
            state.accessToken = action.payload;
        },
        setAuthenticatedStatus: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setUserName: (state, action) => {
            state.username = action.payload;
        },
        setRefreshToken: (state, action) => {
            state.refreshToken = action.payload;
        },
        setIsAdmin: (state, action) => {
            state.isAdmin = action.payload;
        }
    }
});

// Redux: Exporting to the store, syntax = <slice>.reducer, there is no type, it is reducer not reducers as per their documentation
export default authSlice.reducer;
// Redux: Exporting individuals reducers in authSlice.reducers, ensure the syntax is called <slice>.actions
export const {setAccessToken, setAuthenticatedStatus, setUserName, setRefreshToken, setIsAdmin} = authSlice.actions;
