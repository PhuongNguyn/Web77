import { createSlice } from '@reduxjs/toolkit'
import { getUserFromLocalstorage, removeTokenFromLocalstorage, removeUserFromLocalstorage } from '../../utils/localstorge'

const initialState = {
    user: getUserFromLocalstorage(),
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user
        },

        logout: (state, action) => {
            state.user = {}
            removeUserFromLocalstorage()
            removeTokenFromLocalstorage()
        }
    }
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer