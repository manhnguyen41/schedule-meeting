import React, {useEffect, useState} from 'react'
import NavBar from '../../components/NavBar.jsx'
import {pages} from '../../globalVar.js'
import {
  Card,
  Grid,
  Typography,
  Button,
  Container,
  Divider,
  Stack,
  Toolbar,
} from '@mui/material'
import dayjs from 'dayjs'
import ClearIcon from '@mui/icons-material/Clear'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import DoneIcon from '@mui/icons-material/Done'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import ScheduleIcon from '@mui/icons-material/Schedule'
import TableVoteHeader from '../../components/tablechoice/votingmeeting/TableVoteHeader.jsx'
import {useNavigate, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {createAxios} from '../../createInstance.js'
import {getMeetings} from '../../redux/apiRequest/meetingApi.js'
import {getOtherUser} from '../../redux/apiRequest/userApi.js'
import {getResponseByMeetingId} from '../../redux/apiRequest/responseApi.js'
import TableRowVote from '../../components/tablechoice/votingmeeting/TableRowVote.jsx'

function MeetingPreview() {
  const [orderBy, setOrderBy] = useState('Date')
  const [choice, setChoice] = useState([
    {
      responseId: 7,
      userId: 6,
      meetingId: 7,
      createdAt: '2024-01-01T15:42:07.000Z',
      modifiedAt: null,
      deleted: 0,
      deletedAt: null,
      choice: {
        0: 'yes',
        1: 'yes',
        2: 'yes',
        3: 'yes',
      },
    },
  ])
  const [meeting, setMeeting] = useState()
  const [ownerUser, setOwnerUser] = useState({})
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
  const [rows, setRows] = useState([
    {name: 'Manh', choice: {0: 'yes', 1: 'yes'}},
  ])
  const [ownerChoice, setOwnerChoice] = useState({0: 'no', 1: 'no'})
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentUserId = useSelector(state => state.auth.login.currentUserId)
  let axiosJWT = createAxios(currentUserId, dispatch, navigate)
  const {meetingId} = useParams()
  useEffect(async () => {
    const meetings = await getMeetings(currentUserId?.token, dispatch, axiosJWT)
    const meeting = meetings?.find(meeting => meeting.meetingId == meetingId)
    setMeeting(meeting)
    const ownerUser = await getOtherUser(
      currentUserId?.token,
      axiosJWT,
      meeting?.organizerId,
    )
    setOwnerUser(ownerUser)
    const choice = await getResponseByMeetingId(
      currentUserId?.token,
      axiosJWT,
      meeting?.meetingId,
    )
    setChoice(choice)
  }, [])

  useEffect(() => {
    const columns = getColumns(meeting?.startTime)
    const newColumns = [...columns]
    newColumns?.sort(compareDate)
    setColumns(newColumns)
  }, [meeting, choice])

  useEffect(() => {
    console.log(choice)
    getRows(choice).then(result => {
      setRows(result)
    })
  }, [choice])

  useEffect(() => {
    const ownerChoice = choice[0]

    const extractedChoice = Object.keys(ownerChoice?.choice).reduce(
      (acc, key) => {
        acc[key] = 'no'
        return acc
      },
      {},
    )

    setOwnerChoice(extractedChoice)
  }, [choice])

  const getColumns = startTime => {
    const result = Object.entries(
      startTime ? startTime : {0: '2024-01-01T14:55:01.268Z'},
    ).map(([id, startTime], index) => ({
      id: parseInt(id),
      startTime: dayjs(startTime),
      endTime: dayjs(startTime).add(meeting?.duration, 'm'),
      numOfChoice: choice.reduce(
        (total, item) =>
          total +
          (item.choice[id] === 'if need be'
            ? 0.99
            : item.choice[id] === 'yes'
            ? 1
            : 0),
        0,
      ),
    }))
    return result
  }

  const createData = async (userId, choice) => {
    const user = await getOtherUser(currentUserId?.token, axiosJWT, userId)
    const username = user?.username
    return {
      name: username,
      choice: choice,
      isOrganizer: userId == meeting?.organizerId,
    }
  }

  const getRows = choice => {
    return new Promise(resolve => {
      const result = choice?.map(async item => {
        const {userId, choice} = item
        const transformedData = await createData(userId, choice)
        return transformedData
      })

      Promise.all(result).then(transformedDataArray => {
        resolve(transformedDataArray)
      })
    })
  }

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
    const newChoice = {...ownerChoice}
    switch (ownerChoice[event.target.id]) {
      case 'yes':
        newChoice[event.target.id] = 'if need be'
        break
      case 'if need be':
        newChoice[event.target.id] = 'no'
        break
      case 'no':
        newChoice[event.target.id] = 'yes'
        break
      default:
    }
    switch (newChoice[event.target.id]) {
      case 'yes':
        changeNumOfChoiceById(event.target.id, 1)
        break
      case 'if need be':
        break
      case 'no':
        changeNumOfChoiceById(event.target.id, -1)
        break
      default:
    }
    setOwnerChoice(newChoice)
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
      <Container sx={{mt: '100px', pl: '5%', pr: '5%'}}>
        <Grid container spacing={0} sx={{gridAutoRows: '1fr'}}>
          <Grid item xs={3.5} md={3.5}>
            <Card variant="outlined" sx={{p: 4, height: '100%'}}>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{mb: 1}}>
                <AccountCircleRoundedIcon />
                <Stack direction="column" spacing={0}>
                  <Typography sx={{fontSize: 15, fontWeight: 'bold'}}>
                    {ownerUser?.username}
                  </Typography>
                  <Typography sx={{fontSize: 15}}>is organizing</Typography>
                </Stack>
              </Stack>
              <Typography sx={{fontWeight: 'bold', fontSize: 20, mb: 1}}>
                {meeting?.title}
              </Typography>
              <Stack direction="row" spacing={1} sx={{mb: 1}}>
                <AccessTimeRoundedIcon />
                <Typography
                  sx={{fontSize: 17}}>{`${meeting?.duration} min`}</Typography>
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
                  <DoneIcon
                    sx={{color: '#cd9949', backgroundColor: '#fff1a8'}}
                  />
                  <Stack direction="column" spacing={0}>
                    <Typography>If need be</Typography>
                    <Typography>(2 clicks)</Typography>
                  </Stack>
                </Stack>
                <Stack direction="row" spacing={0.5}>
                  <DoneIcon
                    sx={{color: '#0d8834', backgroundColor: '#e7f8ed'}}
                  />
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
                    choice={ownerChoice}
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
                            <Stack
                              direction="row"
                              spacing={0.5}
                              sx={{
                                color: column.startTime.isBefore(dayjs())
                                  ? '#aeaeae'
                                  : '#000000',
                              }}>
                              <DoneIcon sx={{fontSize: 18}} />
                              <Typography sx={{fontSize: 14}}>
                                {Math.round(column.numOfChoice)}
                              </Typography>
                            </Stack>
                          </Stack>
                        </TableCell>
                      ))}
                    </TableRow>
                    {rows?.map((row, index) => (
                      <TableRowVote row={row} index={index} columns={columns} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Divider />
              <Toolbar sx={{mt: 2, mr: 2, mb: 2, ml: 2}}>
                <Button
                  variant="outlined"
                  sx={{
                    fontWeight: 'bold',
                    color: '#666465',
                    borderColor: '#ebebeb',
                    textTransform: 'none',
                  }}
                  onClick={() =>
                    navigate(`/meeting/organize/id/${meeting?.meetingId}`)
                  }>
                  Decline
                </Button>
                <Typography sx={{mx: '8%'}}>
                  Selecting more times makes it easier to find the best option
                </Typography>
                <Button
                  variant="contained"
                  disabled
                  sx={{
                    fontWeight: 'bold',
                    textTransform: 'none',
                    ml: 'auto',
                    color: '#666465',
                    borderColor: '#ebebeb',
                  }}
                  onClick={() => {}}>
                  Continue
                </Button>
              </Toolbar>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default MeetingPreview