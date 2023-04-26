// React, React router DOM
import React, { useEffect, useState } from 'react'
import Accounts from '../components/Accounts'
import Loader from '../components/Loader'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { profileSlice } from '../app/slices/profileSlice'

// API
import { updateProfile } from '../app/api/apiCalls'

const Dashboard = () => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.token.value)
  const profile = useSelector(state => state.profile.value)
  const [loading, setLoading] = useState(true)
  const [editOn, setEditOn] = useState(false)
  const [editedFirstName, setFirstName] = useState('')
  const [editedLastName, setLastName] = useState('')
  const editedUserNames = { firstName: editedFirstName, lastName: editedLastName }

  function handleEdit () {
    setFirstName(profile.firstName)
    setLastName(profile.lastName)
    setEditOn(true)
  }

  function handleEditCancel () {
    setEditOn(false)
  }

  async function handleEditSubmit (e) {
    e.preventDefault()

    const getUpdateResponse = await updateProfile(token, editedUserNames)

    if (getUpdateResponse.status === 200) {
      const updatedProfile = {
        email: profile.email,
        firstName: editedFirstName,
        lastName: editedLastName,
        createdAt: profile.createdAt,
        updatedAt: `${Date.now()}`,
        id: profile.id
      }
      dispatch(profileSlice.actions.saveProfile(updatedProfile))
      setEditOn(false)
    } else {
      console.error("ERR : Couldn't edit name")
    }
  }

  useEffect(() => {
    if (!profile) return
    setLoading(false)
  }, [profile])

  return loading
    ? (
      <Loader />
      )
    : (
    <>
        { profile &&
        <main className="bg-dark">
          <header className='dashboard-header'>
          {!editOn && <h1 className='dashboard-header_h1'>Welcome back {`${profile.firstName}`} <br/> {`${profile.lastName}`}</h1>}
          {!editOn && <button className='dashboard-header_edit-button' onClick={handleEdit}>Edit Name</button>}
          {editOn && <input type='text' className='profile-input' defaultValue={editedFirstName} onChange={(e) => setFirstName(e.target.value)}></input>}
          {editOn && <input type='text' className='profile-input' defaultValue={editedLastName} onChange={(e) => setLastName(e.target.value)}></input>}
          {editOn && <button className='profile-save' onClick={(e) => handleEditSubmit(e)}>Save</button>}
          {editOn && <button className='profile-cancel' onClick={handleEditCancel}>Cancel</button>}
          </header>
          {<Accounts userId={profile.id}/>}
        </main>
        }
      </>
      )
}

export default Dashboard
