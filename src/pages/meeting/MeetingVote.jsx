import HomeIcon from '@mui/icons-material/Home'
import React, {Component, useEffect, useState} from 'react'
import NavBar from '../../components/NavBar.jsx'
import {pages} from '../../globalVar.js'
import {
  Card,
  Grid,
  Typography,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Paper,
  InputBase,
  IconButton,
  Button,
  Container,
  Divider,
  TextField,
  OutlinedInput,
  ToggleButtonGroup,
  ToggleButton,
  Stack,
  AppBar,
  Toolbar,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker'
import dayjs from 'dayjs'
import ClearIcon from '@mui/icons-material/Clear'
import AddIcon from '@mui/icons-material/Add'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded'
import DoneIcon from '@mui/icons-material/Done'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import PeopleIcon from '@mui/icons-material/People'
import TableHeader from '../../components/tablechoice/TableHeader.jsx'
import TableBodyCom from '../../components/tablechoice/TableBodyCom.jsx'
import TableHeaderClickable from '../../components/tablechoice/TableHeaderClickable.jsx'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import ScheduleIcon from '@mui/icons-material/Schedule'
import TableVoteHeader from '../../components/tablechoice/TableVoteHeader.jsx'

function createData(name, choice) {
  return {name, choice}
}

const rows = [
  createData('Manh', {0: 'yes', 1: 'yes'}),
  // createData('Manh1', {0: 'if need be', 1: 'yes'}),
  // createData('Manh2', {0: 'cannot attend', 1: 'yes'}),
]

function MeetingVote() {
  const [orderBy, setOrderBy] = useState('Date')
  const [choice, setChoice] = useState({})
  const [columns, setColumns] = useState([
    {
      id: 0,
      startTime: dayjs().add(1, 'minute'),
      endTime: dayjs(),
      numOfChoice: 1,
    },
    {
      id: 1,
      startTime: dayjs().add(2, 'minute'),
      endTime: dayjs(),
      numOfChoice: 1,
    },
  ])

  const handleOrderSelect = (event, newOrder) => {
    if (newOrder !== null) {
      setOrderBy(newOrder)
    }
  }

  useEffect(() => {
    if (orderBy == 'Date') {
      sortByDate(columns)
    } else {
      sortByChoice(columns)
    }
  }, [orderBy])

  useEffect(() => {
    const choice = {}
    columns.map(column => {
      choice[column.id] = 'No'
    })
    setChoice(choice)
    sortByDate(columns)
  }, [])

  const sortByDate = columns => {
    const newColumns = [...columns]
    newColumns?.sort(compareDate)
    setColumns(newColumns)
  }

  const sortByChoice = columns => {
    const newColumns = [...columns]
    newColumns?.sort(compareChoice)
    setColumns(newColumns)
  }

  const compareDate = (a, b) => {
    if (a.startTime.isBefore(b.startTime)) {
      return -1
    }
    if (b.startTime.isBefore(a.startTime)) {
      return 1
    }
    return 0
  }

  const compareChoice = (a, b) => {
    return b.numOfChoice - a.numOfChoice
  }

  const handleChoiceChange = event => {
    const newChoice = {...choice}
    switch (choice[event.target.id]) {
      case 'Yes':
        newChoice[event.target.id] = 'If need be'
        break
      case 'If need be':
        newChoice[event.target.id] = 'No'
        break
      case 'No':
        newChoice[event.target.id] = 'Yes'
        break
      default:
    }
    switch (newChoice[event.target.id]) {
      case 'Yes':
        changeNumOfChoiceById(event.target.id, 1)
        break
      case 'If need be':
        break
      case 'No':
        changeNumOfChoiceById(event.target.id, -1)
        break
      default:
    }

    setChoice(newChoice)
  }

  const changeNumOfChoiceById = (id, num) => {
    const newColumns = [...columns]
    newColumns.map(column => {
      if (column.id == id) {
        column.numOfChoice += num
      }
    })
    setColumns(newColumns)
  }

  return (
    <>
      <NavBar pages={pages} value={1} />
      <Grid
        container
        spacing={0}
        sx={{mt: '100px', pl: '5%', pr: '5%', gridAutoRows: '1fr'}}>
        <Grid item xs={3.5} md={3.5}>
          <Card variant="outlined" sx={{p: 4, height: '100%'}}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{mb: 1}}>
              <AccountCircleRoundedIcon />
              <Stack direction="column" spacing={0}>
                <Typography sx={{fontSize: 15, fontWeight: 'bold'}}>
                  Manh Nguyen
                </Typography>
                <Typography sx={{fontSize: 15}}>is organizing</Typography>
              </Stack>
            </Stack>
            <Typography sx={{fontWeight: 'bold', fontSize: 20, mb: 1}}>
              Title
            </Typography>
            <Stack direction="row" spacing={1} sx={{mb: 1}}>
              <AccessTimeRoundedIcon />
              <Typography sx={{fontSize: 17}}>30 min</Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={1}
              sx={{mb: 2, alignContent: 'top'}}>
              <SupervisorAccountIcon />
              <Stack direction="column" spacing={0}>
                <Typography sx={{fontSize: 15, fontWeight: 'bold'}}>
                  1 of 1 invitee
                </Typography>
                <Typography sx={{fontSize: 15, fontWeight: 'bold'}}>
                  responded
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="column-reverse" spacing={2}>
              <Stack direction="row" spacing={0.5}>
                <ScheduleIcon
                  sx={{color: '#aeaeae', backgroundColor: '#eeeeef'}}
                />
                <Typography>Pending (yet to vote)</Typography>
              </Stack>
              <Stack direction="row" spacing={0.5}>
                <ClearIcon
                  sx={{color: '#aeaeae', backgroundColor: '#eeeeef'}}
                />
                <Typography>No</Typography>
              </Stack>
              <Stack direction="row" spacing={0.5}>
                <DoneIcon sx={{color: '#cd9949', backgroundColor: '#fff1a8'}} />
                <Stack direction="column" spacing={0}>
                  <Typography>If need be</Typography>
                  <Typography>(2 clicks)</Typography>
                </Stack>
              </Stack>
              <Stack direction="row" spacing={0.5}>
                <DoneIcon sx={{color: '#0d8834', backgroundColor: '#e7f8ed'}} />
                <Typography>Yes (1 click)</Typography>
              </Stack>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={8.5} md={8.5}>
          <Card variant="outlined">
            <Typography sx={{mt: 4, ml: 4, fontSize: 30}}>
              Select your preferred times
            </Typography>
            <Typography sx={{ml: 4, fontSize: 17}}>
              We’ll let you know when the organizer picks the best time
            </Typography>
            <Divider sx={{mt: '36px'}} />
            <TableContainer sx={{maxHeight: 440}}>
              <Table
                stickyHeader
                sx={{
                  '.MuiTableCell-sizeMedium': {
                    pt: '3px',
                    pr: '1px',
                    pb: '3px',
                    pl: '16px',
                  },
                  '.MuiTableCell-sizeSmall': {
                    pt: '3px',
                    pr: '1px',
                    pb: '3px',
                    pl: '1px',
                  },
                  tableLayout: 'fixed',
                  width: 'auto',
                }}>
                <TableVoteHeader
                  orderBy={orderBy}
                  handleOrderSelect={handleOrderSelect}
                  columns={columns}
                  choice={choice}
                  handleChoiceChange={handleChoiceChange}
                />
                <TableBody>
                  <TableRow key={2}>
                    <TableCell
                      sx={{
                        width: '260px',
                        minWidth: '260px',
                        left: 0,
                        background: 'white',
                        size: 'medium',
                        position: 'sticky',
                        scope: 'row',
                        borderBottom: 'none',
                      }}></TableCell>
                    {columns.map(column => (
                      <TableCell size="small" sx={{borderBottom: 'none'}}>
                        <Stack direction="column" sx={{alignItems: 'center'}}>
                          <Stack direction="row" spacing={0.5}>
                            <DoneIcon sx={{fontSize: 18}} />
                            <Typography sx={{fontSize: 14}}>
                              {column.numOfChoice}
                            </Typography>
                          </Stack>
                        </Stack>
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow key={1}>
                    <TableCell
                      key="name"
                      align="left"
                      sx={{
                        width: '260px',
                        minWidth: '260px',
                        left: 0,
                        background: 'white',
                        size: 'medium',
                        position: 'sticky',
                        scope: 'row',
                      }}>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        sx={{mt: 1, mb: 1}}>
                        <AccountCircleRoundedIcon sx={{fontSize: 40}} />
                        <Stack direction="column" spacing={0}>
                          <Typography sx={{fontSize: 17, fontWeight: 'bold'}}>
                            Name
                          </Typography>
                          <Typography sx={{fontSize: 13}}>Organizer</Typography>
                        </Stack>
                      </Stack>
                    </TableCell>
                    {columns.map(column => (
                      <TableCell
                        key={column.id}
                        align="center"
                        sx={{width: '100px', minWidth: '100px'}}
                        size="small">
                        <Typography
                          sx={{
                            backgroundColor: column.startTime.isBefore(dayjs())
                              ? '#f8f8f9'
                              : '#e7f8ed',
                            width: '92px',
                            height: '48px',
                            mt: '4px',
                            mr: '5px',
                            mb: '4px',
                            ml: '5px',
                          }}>
                          <DoneIcon
                            sx={{
                              color: column.startTime.isBefore(dayjs())
                                ? '#aeaeae'
                                : '#0d8834',
                              backgroundColor: column.startTime.isBefore(
                                dayjs(),
                              )
                                ? '#f8f8f9'
                                : '#e7f8ed',
                              mt: '10px',
                            }}
                          />
                        </Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Divider />
            <Stack
              direction="row"
              spacing={3}
              sx={{mt: 2, mr: 3, mb: 2, ml: 4}}>
              <Button
                variant="outlined"
                sx={{
                  fontWeight: 'bold',
                  color: '#666465',
                  borderColor: '#ebebeb',
                  textTransform: 'none',
                }}
                onClick={() => {}}>
                Decline
              </Button>
              <Typography>
                Selecting more times makes it easier to find the best option
              </Typography>
              <Button
                variant="contained"
                sx={{
                  fontWeight: 'bold',
                  textTransform: 'none',
                }}
                onClick={() => {}}>
                Continue
              </Button>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default MeetingVote
