import {
  Button,
  TextField,
  Stack,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { DesktopDatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { useRef, useState } from 'react'
import { useTodoContext } from '../Context/TodoContext'

const AddTodoForm = () => {
  const { addTodo } = useTodoContext()
  const initiaDate = dayjs().add(1, 'day')
  const [date, setDate] = useState(initiaDate)
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)
  const [inputShrink, setinputShrink] = useState(false)
  const todoRef = useRef()
  const priorityRef = useRef()
  const dateRef = useRef()
  const handleSubmit = (e) => {
    e.preventDefault()
    const fd = new FormData()
    fd.append('todo', todoRef.current.value)
    fd.append('dueDate', dateRef.current.value)
    fd.append('priority', priorityRef.current.value)
    addTodo(fd)
    todoRef.current.value = ''
    todoRef.current.focus()
    todoRef.current.blur()
    setDate(initiaDate)
    setValue('')
    setOpen(true)
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        autoComplete='off'
        required
        label='Enter New Todo'
        name='todo'
        inputRef={todoRef}
        fullWidth
        onBlur={() => (!todoRef.current.value ? setinputShrink(false) : setinputShrink(true))}
        onFocus={() => setinputShrink(true)}
        InputLabelProps={{ shrink: inputShrink }}
        variant='outlined'
        sx={{ marginBlock: 1 }}
      />
      <br />
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={1}
        alignItems='center'
        justifyContent='space-between'
      >
        <DesktopDatePicker
          required
          label='Due Date'
          inputFormat='DD-MMM-YYYY'
          value={date}
          inputRef={dateRef}
          onChange={(newDate) => setDate(newDate)}
          format='MMM DD, YYYY'
          sx={{ width: { xs: '100%', md: '40%' } }}
        />
        <FormControl sx={{ width: { xs: '100%', md: '40%' } }} required fullWidth>
          <InputLabel id='priority'>Priority</InputLabel>
          <Select
            renderValue={(value) => value && value}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            inputRef={priorityRef}
            labelId='priority'
            label='Priority'
          >
            <MenuItem value={'Low'}>Low</MenuItem>
            <MenuItem value={'Medium'}>Medium</MenuItem>
            <MenuItem value={'High'}>High</MenuItem>
          </Select>
        </FormControl>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='success'
          sx={{ textTransform: 'none', minWidth: 'fit-content', width: { xs: '100%', md: '20%' } }}
        >
          Add Todo
        </Button>
      </Stack>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} elevation={6} variant='filled' severity='success' sx={{ width: '100%' }}>
          New Todo is Added Successfully!
        </Alert>
      </Snackbar>
    </form>
  )
}

export default AddTodoForm
