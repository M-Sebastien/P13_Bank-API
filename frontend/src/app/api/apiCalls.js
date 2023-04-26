import { userAccounts, userTransactions } from './mockedData'

async function getMockedAccounts (id) {
  return new Promise((resolve, reject) => {
    const response = userAccounts.find(object => object.id === id)
    response ? resolve(response) : reject(new Error('No account data found. \n id:', id))
  })
}

async function getMockedTransactions (userId, accountId) {
  return new Promise((resolve, reject) => {
    let transactions
    const user = userTransactions.find(user => user.userId === userId)
    if (user) {
      const userAccount = user.accounts.find(account => account.accountId === accountId)
      transactions = userAccount.transactions
    }
    transactions ? resolve(transactions) : reject(new Error('No account data found. \n userId ' + userId + '\n accountId: ' + accountId))
  })
}

async function getProfile (token) {
  const fetchPayload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + token
    }
  }

  const response = await fetch('http://localhost:3001/api/v1/user/profile', fetchPayload)
  const jsonResponse = await response.json()

  /*   console.log('Promise state', jsonResponse) */
  return jsonResponse
}

async function getToken (credentials) {
  const fetchPayload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }

  const response = await fetch('http://localhost:3001/api/v1/user/login', fetchPayload)
  const jsonResponse = await response.json()

  /*   console.log('Promise state', jsonResponse) */
  return jsonResponse
}

async function updateProfile (token, editedUserNames) {
  const fetchPayload = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + token
    },
    body: JSON.stringify(editedUserNames)
  }

  const response = await fetch('http://localhost:3001/api/v1/user/profile', fetchPayload)
  const jsonResponse = await response.json()

  /*   console.log('Promise state', jsonResponse) */
  return jsonResponse
}

export { getToken, getProfile, getMockedAccounts, getMockedTransactions, updateProfile }
