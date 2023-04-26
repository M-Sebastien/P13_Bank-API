function storeLocalToken (token) {
  const localStorageTokenPart = token.slice(0, token.length / 2)
  const cookieTokenPart = token.split(localStorageTokenPart)[1]
  const currentDate = new Date(Date.now())
  const tokenExpirationDate = new Date(currentDate.setDate(currentDate.getDate() + 1))

  const localStoragePayload = {
    token: localStorageTokenPart,
    expiration: tokenExpirationDate
  }
  window.localStorage.setItem('argentBankToken', JSON.stringify(localStoragePayload))
  document.cookie = ('argentBankToken', cookieTokenPart)
}

function deleteLocalToken () {
  window.localStorage.removeItem('argentBankToken')
  document.cookie = ''
}

export { storeLocalToken, deleteLocalToken }
