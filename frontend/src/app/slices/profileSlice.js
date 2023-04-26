import { createSlice } from '@reduxjs/toolkit'

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    value: undefined
  },
  reducers: {
    saveProfile: (state, action) => {
      state.value = action.payload
    },
    deleteProfile: (state) => {
      state.value = undefined
    }
  }
})

export const { saveProfile, deleteProfile } = profileSlice.actions

export default profileSlice.reducer
