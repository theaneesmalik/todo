import { useEffect, useReducer } from 'react'
import axios from 'axios'

const initialState = {
  data: [],
  error: null,
  loading: true,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'REQUEST':
      return { ...state, loading: true }
    case 'SUCCESS':
      return { ...state, loading: false, data: action.payload }
    case 'ERROR':
      return { ...state, loading: false, error: action.payload }
    default:
      throw new Error(`Invalid action type: ${action.type}`)
  }
}

const useFetch = (url) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchData = async () => {
    dispatch({ type: 'REQUEST' })
    try {
      const response = await axios.get(url)
      dispatch({ type: 'SUCCESS', payload: response?.data })
      return true
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error })
    }
  }

  useEffect(() => {
    fetchData()
  }, [url])

  const refetch = () => {
    fetchData()
  }

  return { ...state, refetch }
}

export default useFetch
