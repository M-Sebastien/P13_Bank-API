import { createSlice } from '@reduxjs/toolkit'

export const accountsSlice = createSlice({
  name: 'account',
  initialState: {
    value: undefined
  },
  reducers: {
    saveAccounts: (state, action) => {
      state.value = action.payload
    },
    deleteDetails: (state) => {
      state.value = ''
    }
  }
})

export const { saveAccounts, deleteDetails } = accountsSlice.actions

export default accountsSlice.reducer
