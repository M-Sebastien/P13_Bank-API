// React
import React, { useState } from 'react'
import PropTypes from 'prop-types'
// Assets
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp, faPen, faCheck } from '@fortawesome/free-solid-svg-icons'

const penIcon = <FontAwesomeIcon icon={faPen} />
const chevronDownIcon = <FontAwesomeIcon icon={faChevronDown} />
const chevronUpIcon = <FontAwesomeIcon icon={faChevronUp} />
const checkMark = <FontAwesomeIcon icon={faCheck} />

const Transaction = ({ id, date, description, amount, balance, type, category, notes }) => {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [categoryEditOn, setCategoryEditOn] = useState(false)
  const [notesEditOn, setNotesEditOn] = useState(false)
  const [newCategory, setNewCategory] = useState(category)
  const [newNotes, setNewNotes] = useState(notes)

  Transaction.propTypes = {
    id: PropTypes.number,
    date: PropTypes.string,
    description: PropTypes.string,
    amount: PropTypes.number,
    balance: PropTypes.number,
    type: PropTypes.string,
    category: PropTypes.string,
    notes: PropTypes.string
  }

  function handleChevronClick () {
    setIsCollapsed(!isCollapsed)
  }

  function handleCategoryEdit () {
    setCategoryEditOn(true)
  }

  function handleNotesEdit () {
    setNotesEditOn(true)
  }

  function handleCategorySelectOption (e) {
    console.log(newCategory)
    setNewCategory(e.target.value)
    setCategoryEditOn(false)
  }

  function handleNotesSubmit (e) {
    e.preventDefault()
    setNotesEditOn(false)
  }

  function handleNotesInputChange (e) {
    setNewNotes(e.target.value)
  }

  return (
    <div className='transaction' id={id}>
      <div className='transaction-details'>
        <button className='transaction__collapse-button' onClick={handleChevronClick}>
          {isCollapsed && chevronDownIcon}
          {!isCollapsed && chevronUpIcon}
        </button>
        <span className='transaction__date'>{date}</span>
        <span className='transaction-details__description'>{description}</span>
        <span className='transaction-details__amount'>{`$ ${amount}`}</span>
        <span className='transaction-details__balance'>{`$ ${balance}`}</span>
      </div>
      <div className={isCollapsed ? 'transaction-edition' : 'transaction-edition expanded' }>
        <div className='transaction-edition__content'>
          <span className='transaction-edition__type'>{`Transaction type: ${type}`}</span>
          <div className='transaction-edition__category'>
             <div className='transaction-edition__category__content'>Category: &nbsp;
            { !categoryEditOn && <span>{newCategory}</span>}
            { categoryEditOn &&
            <select onChange={(e) => handleCategorySelectOption(e)}>
              <option>Food</option>
              <option>Shopping</option>
              <option>Clothes</option>
              <option>Travel</option>
              <option>Software</option>
            </select>}
            </div>
            { !categoryEditOn && <button className='transaction-edition__edit-button' onClick={handleCategoryEdit}>{penIcon}</button>}
          </div>
          <div className='transaction-edition__notes'>
             <div className='transaction-edition__notes__content'>Notes:&nbsp;
             { !notesEditOn && <span>{newNotes}</span>}
             {notesEditOn &&
             <form id='transaction-edition__notes-form'>
              <input type='text' onChange={(e) => handleNotesInputChange(e)} defaultValue={newNotes}></input>
              <button type='submit' onClick={(e) => handleNotesSubmit(e)}>{checkMark}</button>
             </form>
             }
            </div>
            { !notesEditOn && <button className='transaction-edition__edit-button' onClick={handleNotesEdit}>{penIcon}</button>}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Transaction
