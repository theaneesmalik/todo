import * as React from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { Slide } from '@mui/material'
import { useTodoContext } from '../Context/TodoContext'
import EditTodoForm from './EditTodoForm'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
}
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})
export default function EditDialog({ todo, close, setOpen }) {
  const todoRef = React.useRef()
  const priorityRef = React.useRef()
  const dateRef = React.useRef()
  const { updateTodo } = useTodoContext()

  const [open, setDialogOpen] = React.useState(true)

  const handleClose = () => {
    setDialogOpen(false)
    close()
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const fd = new FormData()
    fd.append('todo', todoRef.current.value)
    fd.append('dueDate', dateRef.current.value)
    fd.append('priority', priorityRef.current.value)
    const data = {
      ...todo,
      todo: todoRef.current.value,
      dueDate: dateRef.current.value,
      priority: priorityRef.current.value,
    }
    updateTodo(data)
    setOpen(true)
    handleClose()
  }
  return (
    <form onSubmit={handleSubmit}>
      <BootstrapDialog TransitionComponent={Transition} onClose={handleClose} open={open}>
        <BootstrapDialogTitle onClose={handleClose}>Editing Todo</BootstrapDialogTitle>
        <DialogContent dividers>
          <EditTodoForm todo={todo} dateRef={dateRef} priorityRef={priorityRef} todoRef={todoRef} />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSubmit} variant='contained' type='submit'>
            Update
          </Button>
          <Button variant='contained' color='error' onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </form>
  )
}
