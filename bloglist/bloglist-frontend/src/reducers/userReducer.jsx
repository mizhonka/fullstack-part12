import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const userSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        setUsers(state, action) {
            return action.payload
        },
    },
})

export const initializeUsers = () => {
    return async (dispatch) => {
        const initial = await userService.getAll()
        dispatch(setUsers(initial))
    }
}

export const { setUsers } = userSlice.actions
export default userSlice.reducer
