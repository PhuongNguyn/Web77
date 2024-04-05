import { createSlice } from '@reduxjs/toolkit'
import { getUserFromLocalstorage } from '../../utils/localstorge'

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
    }
})

export const { login } = userSlice.actions

export default userSlice.reducer