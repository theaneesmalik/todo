// useTodoCategorization.js

function useTodoCategorization() {
  function categorize(todos) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const todayTodos = []
    const pastTodos = []
    const futureTodos = []

    todos.forEach((todo) => {
      const dueDate = new Date(todo.dueDate)
      dueDate.setHours(0, 0, 0, 0)

      if (dueDate.getTime() === today.getTime()) {
        todayTodos.push(todo)
      } else if (dueDate < today) {
        pastTodos.push(todo)
      } else {
        futureTodos.push(todo)
      }
    })
    todayTodos.sort((a, b) => {
      const priorityOrder = { High: 3, Medium: 2, Low: 1 }
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    })
    return {
      todayTodos,
      pastTodos,
      futureTodos,
    }
  }

  return categorize
}

export default useTodoCategorization
