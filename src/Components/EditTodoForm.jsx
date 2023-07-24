import { TextField, Stack, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { DesktopDatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

const EditTodoForm = ({ todo, todoRef, priorityRef, dateRef }) => {
  const [date, setDate] = useState(dayjs(todo.dueDate))
  const [value, setValue] = useState('')

  useEffect(() => setValue(todo.priority), [todo.priority])

  return (
    <>
      <TextField
        autoComplete='off'
        required
        label='Enter New Todo'
        name='todo'
        inputRef={todoRef}
        fullWidth
        defaultValue={todo.todo}
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
          sx={{ width: { xs: '100%', md: '50%' } }}
        />
        <FormControl sx={{ width: { xs: '100%', md: '50%' } }} required fullWidth>
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
      </Stack>
    </>
  )
}

export default EditTodoForm
