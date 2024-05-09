import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: ['', 'success'],
    reducers: {
        showNotification(state, action) {
            return [action.payload[0], action.payload[1]]
        },
        removeNotification(state, action) {
            return ['', 'success']
        },
    },
})

export const setNotification = (content, time) => {
    return async (dispatch) => {
        dispatch(showNotification(content))
        setTimeout(() => dispatch(removeNotification()), time)
    }
}

export const { showNotification, removeNotification } =
    notificationSlice.actions
export default notificationSlice.reducer
