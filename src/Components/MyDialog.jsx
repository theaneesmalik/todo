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
import Typography from '@mui/material/Typography'
import { Slide } from '@mui/material'
import { useTodoContext } from '../Context/TodoContext'

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
export default function MyDialog({ todo, close, setOpen }) {
  const { deleteTodo } = useTodoContext()

  const [open, setDialogOpen] = React.useState(true)

  const handleClose = () => {
    setDialogOpen(false)
    close()
  }
  const handleDelete = () => {
    setOpen(true)
    deleteTodo(todo._id)
    handleClose()
  }
  return (
    <div>
      <BootstrapDialog TransitionComponent={Transition} onClose={handleClose} open={open}>
        <BootstrapDialogTitle onClose={handleClose}>Deleting Todo</BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>Are you sure you want to delete the {`"${todo.todo}"`} todo?</Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant='contained' color='error' onClick={handleDelete}>
            Delete
          </Button>
          <Button variant='contained' onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  )
}
