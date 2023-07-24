import {
  Tabs,
  Tab,
  Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  tableCellClasses,
  styled,
  TableBody,
} from '@mui/material'

import MyListItem from './MyListItem'
import { useState } from 'react'
import { useTodoContext } from '../Context/TodoContext'

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <Table role='tabpanel' hidden={value !== index} {...other}>
      {value === index && <>{children}</>}
    </Table>
  )
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}))
const MyTableHead = () => {
  return (
    <TableHead sx={{ position: 'sticky', top: 0 }}>
      <TableRow sx={{ width: '100%' }}>
        <StyledTableCell sx={{ width: '10%' }}>Status</StyledTableCell>
        <StyledTableCell sx={{ width: '40%' }}>Todo</StyledTableCell>
        <StyledTableCell sx={{ width: '15%' }}>Due Date</StyledTableCell>
        <StyledTableCell sx={{ width: '10%' }}>Priority</StyledTableCell>
        <StyledTableCell sx={{ width: '15%' }}>Actions</StyledTableCell>
      </TableRow>
    </TableHead>
  )
}
export default function TodoList() {
  const { todos } = useTodoContext()
  const [value, setValue] = useState(1)
  const handleTabChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <Paper elevation={5} sx={{ width: '100%', overflow: 'auto' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleTabChange}>
          <Tab label='Past' />
          <Tab label='Today' />
          <Tab label='Future' />
        </Tabs>
      </Box>
      <TableContainer sx={{ maxHeight: { xs: '100vh', sm: '60vh' } }}>
        <CustomTabPanel value={value} index={0}>
          <MyTableHead />
          <TableBody>
            {todos.pastTodos?.map((todo) => (
              <MyListItem key={todo._id} todo={todo} />
            ))}
          </TableBody>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <MyTableHead />
          <TableBody>
            {todos.todayTodos?.map((todo) => (
              <MyListItem key={todo._id} todo={todo} />
            ))}
          </TableBody>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <MyTableHead />
          <TableBody>
            {todos.futureTodos?.map((todo) => (
              <MyListItem key={todo._id} todo={todo} />
            ))}
          </TableBody>
        </CustomTabPanel>
      </TableContainer>
    </Paper>
  )
}
