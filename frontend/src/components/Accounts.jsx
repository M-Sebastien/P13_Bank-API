// React
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { accountsSlice } from '../app/slices/accountsSlice'

// Features
import { getMockedAccounts } from '../app/api/apiCalls'
import { v4 as uuidv4 } from 'uuid'

const AccountsOverview = ({ userId }) => {
  AccountsOverview.propTypes = {
    userId: PropTypes.string
  }
  const dispatch = useDispatch()
  const accounts = useSelector((state) => state.accounts.value)

  useEffect(() => {
    async function fetchAccounts (id) {
      const fetchAccountsResponse = await getMockedAccounts(id)
      const fetchedAccountsData = fetchAccountsResponse.accounts
      dispatch(accountsSlice.actions.saveAccounts(fetchedAccountsData))
    }
    fetchAccounts(userId)
  }, [accounts])

  return (
    <>
    {
      accounts && accounts.map(account => {
        return (
        <section className='account' key={uuidv4()}>
          <div className='account__details'>
            <span className='account__details__title'>{account.accountTitle}</span>
            <span className='account__details__amount'>{account.accountBalance}</span>
            <span className='account__details__type'>{account.accountDescription}</span>
          </div>
          <NavLink to={`/account/${account.accountId}`} className='account__view-button cta'>
            <button className='view-transaction-button'>View transactions</button>
          </NavLink>
        </section>
        )
      })
    }
    </>
  )
}

export default AccountsOverview
