import { accountsOverviewData } from './mockedData'

function getAccountOverview (id) {
  const result = accountsOverviewData[id]
  delete result.accountTransactions
  return result
}

function getAccountTransactions (userId, accountId) {
  const userAccounts = accountsOverviewData[userId]
  const accountTransactions = userAccounts[accountId]
  return accountTransactions.transactions
}

export { getAccountOverview, getAccountTransactions }
