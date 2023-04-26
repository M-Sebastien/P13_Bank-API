
import { useEffect, useState } from 'react'

const useFetch = (url, fetchParameters) => {
  const [apiData, setApiData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [serverError, setServerError] = useState(null)

  useEffect(() => {
    setLoading(true)

    async function fetchData () {
      try {
        const response = await fetch(url, {
          method: fetchParameters.method,
          headers: fetchParameters.headers,
          body: fetchParameters.body
        })
        const data = response.json()
        const body = data.body
        setApiData(body)
        setLoading(false)
      } catch (error) {
        setServerError(error)
        setLoading(false)
      }
    }
    fetchData()
  }, [url])
  return { loading, apiData, serverError }
}

export default useFetch
