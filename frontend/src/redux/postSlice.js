import { createSlice } from '@reduxjs/toolkit'

const postSlice = createSlice({
    name: 'post',
    initialState: {
        myPost: null,
        allPost: []
    },
    reducers: {
        getMyPost: (state, action) => {
            state.myPost = action.payload
        },
        getAllPosts: (state, action) => {
            state.allPost = action.payload
        }
    }
})
export const { getAllPosts, getMyPost } = postSlice.actions;
export default postSlice.reducer;