import {createSlice} from '@reduxjs/toolkit';

export const tabsSlice = createSlice({
    name: 'tabsSlice',
    initialState: {
        isSuccess: false,
        isError: false,
        isRefresh: false
    },
    reducers: {
        setSuccess: (state, action) => {
            state.isSuccess = action.payload;
        },
        setError: (state, action) => {
            state.isError = action.payload;
        },
        setIsRefresh: (state, action) => {
            state.isRefresh = action.payload;
        }
    }
});

export default tabsSlice.reducer;
export const {setSuccess, setError, setIsRefresh} = tabsSlice.actions;
