// TodoContext.js
import React, { createContext, useContext, useState, useEffect } from 'react'
import useFetch from '../Hooks/useFetch'
import useTodoCategorization from '../Hooks/useTodoCategorization'
import axios from 'axios'

const TodoContext = createContext()

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([])
  const categorize = useTodoCategorization()
  const { data, loading, error, refetch } = useFetch('/todos')

  useEffect(() => {
    if (data) {
      setTodos(categorize(data))
    }
  }, [data, categorize])

  const addTodo = (fd) => {
    axios
      .post('todos', fd)
      .then((res) => {
        refetch()
      })
      .catch((err) => console.log(err))
  }
  const updateTodo = (fd) => {
    axios
      .put('todos', fd)
      .then((res) => {
        refetch()
      })
      .catch((err) => console.log(err))
  }
  const deleteTodo = (id) => {
    axios
      .delete('todos', { data: { id: id } })
      .then((res) => {
        refetch()
      })
      .catch((err) => console.log(err))
  }

  return (
    <TodoContext.Provider value={{ todos, loading, error, addTodo, updateTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  )
}

export function useTodoContext() {
  const context = useContext(TodoContext)
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider')
  }
  return context
}
