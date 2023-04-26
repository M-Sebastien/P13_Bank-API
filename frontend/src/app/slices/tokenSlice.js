import { createSlice } from '@reduxjs/toolkit'

export const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    value: undefined
  },
  reducers: {
    saveToken: (state, action) => {
      state.value = action.payload
    },
    deleteToken: (state) => {
      state.value = undefined
    }
  }
})

export const { saveToken, deleteToken } = tokenSlice.actions

export default tokenSlice.reducer
