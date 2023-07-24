import { LocalizationProvider } from '@mui/x-date-pickers'
import { Header, TodoList, AddTodoForm } from './Components'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TodoProvider } from './Context/TodoContext'
function App() {
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Header />
        <TodoProvider>
          <AddTodoForm />
          <TodoList />
        </TodoProvider>
      </LocalizationProvider>
    </div>
  )
}

export default App
