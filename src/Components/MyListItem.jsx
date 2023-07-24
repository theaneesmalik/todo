import {
  IconButton,
  Tooltip,
  Checkbox,
  Snackbar,
  Alert,
  TableCell,
  styled,
  TableRow,
  tableCellClasses,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useEffect, useState } from 'react'
import MyDialog from './MyDialog'
import { useTodoContext } from '../Context/TodoContext'
import EditDialog from './EditDialog'
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))
function formatDate(dateTimeString) {
  const date = new Date(dateTimeString)

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const day = date.getDate()
  const monthIndex = date.getMonth()
  const year = date.getFullYear()

  const formattedDate = `${months[monthIndex]} ${day}, ${year}`

  return formattedDate
}

const MyListItem = ({ todo }) => {
  const [alertMsg, setAlertMsg] = useState('')
  const { updateTodo } = useTodoContext()
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [isDone, setIsDone] = useState(todo.isDone)
  const [open, setOpen] = useState(() => false)
  const [editDialog, setEditDialog] = useState(false)
  useEffect(() => {
    setAlertMsg('Todo is Updated Successfully!')
  }, [editDialog])
  useEffect(() => {
    setAlertMsg('Todo is Deleted Successfully!')
  }, [deleteDialog])

  const doneTodoStyle = {
    textDecoration: isDone ? 'line-through' : 'none',
    color: isDone ? 'rgb(141 134 134)' : '',
  }
  const handleClose = (e, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const handleDone = (e) => {
    updateTodo({ ...todo, isDone: e.target.checked })
    setIsDone(e.target.checked)
  }

  return (
    <>
      <StyledTableRow>
        <StyledTableCell>
          <Checkbox checked={isDone} disabled={isDone} onChange={handleDone} />
        </StyledTableCell>
        <StyledTableCell sx={doneTodoStyle}>{todo.todo}</StyledTableCell>
        <StyledTableCell sx={doneTodoStyle}>{formatDate(todo.dueDate)}</StyledTableCell>
        <StyledTableCell sx={doneTodoStyle}>{todo.priority}</StyledTableCell>
        <StyledTableCell>
          <Tooltip title='Edit Todo' arrow>
            <IconButton
              edge='end'
              disabled={isDone}
              onClick={() => {
                setEditDialog(true)
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Delete Todo' arrow>
            <IconButton edge='end' onClick={() => setDeleteDialog(true)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </StyledTableCell>
      </StyledTableRow>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} elevation={6} variant='filled' severity='info' sx={{ width: '100%' }}>
          {alertMsg}
        </Alert>
      </Snackbar>
      {deleteDialog && <MyDialog todo={todo} close={() => setDeleteDialog(false)} setOpen={setOpen} />}
      {editDialog && <EditDialog todo={todo} close={() => setEditDialog(false)} setOpen={setOpen} />}
    </>
  )
}

export default MyListItem
