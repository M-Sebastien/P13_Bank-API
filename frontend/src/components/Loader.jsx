import React from 'react'
import LoaderIcon from '../assets/vault.svg'

const Loader = () => {
  return (
    <div className='loader-container'>
      <img className='loader-icon' src={LoaderIcon} alt="loading"/>
    </div>
  )
}

export default Loader
