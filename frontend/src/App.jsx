// React, React router DOM
import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// React components
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Nav from './components/Nav'
import Footer from './components/Footer'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { tokenSlice } from './app/slices/tokenSlice'
import { profileSlice } from './app/slices/profileSlice'

// API calls
import { getProfile } from './app/api/apiCalls'

function App () {
  const dispatch = useDispatch()
  const token = useSelector(state => state.token.value)

  async function fetchAndDispatchProfile (userToken) {
    const getProfileResponse = await getProfile(userToken)
    if (getProfileResponse.status === 200) {
      const profile = getProfileResponse.body
      dispatch(profileSlice.actions.saveProfile(profile))
    }
  }

  async function resumeSession () {
    if (window.localStorage.argentBankToken && document.cookie) {
      const cookieToken = document.cookie
      const localStoragePayloadJSON = JSON.parse(window.localStorage.argentBankToken)
      const localStorageToken = localStoragePayloadJSON.token
      const localStorageExpiration = new Date(localStoragePayloadJSON.expiration)

      if (Date.now() > localStorageExpiration) {
        console.log('token has expired')
        return
      }
      const token = localStorageToken + cookieToken
      dispatch(tokenSlice.actions.saveToken(token))
    }
    if (token) await fetchAndDispatchProfile(token)
  }

  useEffect(() => {
    resumeSession()
  }, [token])

  return (
      <>
        <BrowserRouter>
        <Nav />
          <Routes>
            <Route path='/' element={<Home />}>
            </Route>
            <Route path='/login' element={<Login />}>
            </Route>
            <Route path='/dashboard' element={<Dashboard />}>
            </Route>
            <Route
              path='/account/:id' element={<Transactions />}>
            </Route>
          </Routes>
        </BrowserRouter>
        <Footer />
      </>
  )
}

export default App
