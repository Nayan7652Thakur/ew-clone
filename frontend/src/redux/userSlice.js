import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        profile: null,
        allUsers: null
    },
    reducers: {
        getUser: (state, action) => {
            state.user = action.payload
        },
        getMyProfile: (state, action) => {
            state.profile = action.payload
        },
        getAllUsers: (state, action) => {
            state.allUsers = action.payload
        }
    }
})
export const { getUser, getMyProfile, getAllUsers } = userSlice.actions;
export default userSlice.reducer;