import { configureStore } from '@reduxjs/toolkit'
import profileReducer from '../app/slices/profileSlice'
import tokenReducer from '../app/slices/tokenSlice'
import accountReducer from '../app/slices/accountsSlice'

export default configureStore({
  reducer: {
    profile: profileReducer,
    token: tokenReducer,
    accounts: accountReducer
  }
})
