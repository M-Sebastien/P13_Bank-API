// Hooks
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// React components
import Logo from '../assets/argentBankLogo.png'

// Features
import { tokenSlice } from '../app/slices/tokenSlice'
import { profileSlice } from '../app/slices/profileSlice'
import { accountsSlice } from '../app/slices/accountsSlice'
import { deleteLocalToken } from '../app/api/manageLocalToken'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

const Nav = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector((state) => state.token.value)
  const profile = useSelector(state => state.profile.value)

  function handleSignOut () {
    dispatch(tokenSlice.actions.deleteToken())
    dispatch(profileSlice.actions.deleteProfile())
    dispatch(accountsSlice.actions.deleteDetails())
    deleteLocalToken()
    navigate('../')
  }

  return (
    <nav>
      <NavLink to='/'>
        <img className='nav-logo' src={Logo} alt='ArgentBank logo'></img>
      </NavLink>
      <div>
        {
          !token &&
          <NavLink to='/login' >
            <button className='nav-button sign-in'>
            {<FontAwesomeIcon icon={faCircleUser} />}
            <div>Sign In</div>
            </button>
          </NavLink>
        }
        {
          token && profile &&
          <NavLink to='/dashboard'>
            <button className="nav-button user-button">
              {<FontAwesomeIcon icon={faCircleUser} />}
              <div>{profile.firstName}</div>
            </button>
          </NavLink>
        }
        {
          token && profile &&
          <button className="nav-button sign-out" onClick={() => handleSignOut()}>
            {<FontAwesomeIcon icon={faArrowRightFromBracket} />}
            <div>Sign Out</div>
          </button>
        }
      </div>
    </nav>
  )
}

export default Nav
