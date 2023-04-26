// React, React router DOM
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { tokenSlice } from '../app/slices/tokenSlice'

// API
import { getToken } from '../app/api/apiCalls'

// Assets
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { storeLocalToken } from '../app/api/manageLocalToken'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const token = useSelector(state => state.token.value)
  const serviceData = { email: userEmail, password: userPassword }

  async function handleSubmit (e) {
    e.preventDefault()
    const getTokenResponse = await getToken(serviceData)
    if (getTokenResponse.status === 200) {
      const token = getTokenResponse.body.token
      dispatch(tokenSlice.actions.saveToken(token))
      if (rememberMe) storeLocalToken(token)
      setLoading(!loading)
    }
  }

  async function handleRememberMe (e) {
    setRememberMe(!rememberMe)
  }

  useEffect(() => {
    if (token) navigate('../dashboard')
  }, [loading])

  return (
    <>
      <main className='bg-dark'>
        <section className='sign-in-content'>
        {<FontAwesomeIcon icon={faCircleUser} />}
        <h1>Sign In</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='input-wrapper'>
            <label htmlFor='username'>Username</label>
            <input id='username' type='text' value={userEmail} onChange={(e) => setUserEmail(e.target.value)}></input>
          </div>
          <div className='input-wrapper'>
            <label htmlFor='password'>Password</label>
            <input id='password' type='password' value={userPassword} onChange={(e) => setUserPassword(e.target.value)}></input>
          </div>
          <div className='input-remember'>
            <input id='remember-me' type='checkbox' defaultValue={rememberMe} onChange={(e) => handleRememberMe(e.target.value)} ></input>
            <label htmlFor='remember-me'>Remember me</label>
          </div>
            <button className='sign-in-submit'>Sign In</button>
        </form>
        </section>
      </main>
    </>
  )
}

export default Login
