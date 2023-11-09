import {configureStore} from '@reduxjs/toolkit';
// Redux: note that we are not importing a single function, we are importing the entire file so we can name it anything
import authReducer from './slices/auth/authSlice';
import tabsReducer from './slices/tabs/tabsSlice';

// Redux This is where you declare all the reducers that are allowed to affect their own global states.

export const store = configureStore({
    reducer: {
        // name of slice: function to have access to, if all reducer functions just use userslice.reducer
        authSlice: authReducer,
        tabsSlice: tabsReducer
    }
});
