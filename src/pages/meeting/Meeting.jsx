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
  AppBar,
  Toolbar,
} from '@mui/material'
import dayjs from 'dayjs'
import ClearIcon from '@mui/icons-material/Clear'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded'
import DoneIcon from '@mui/icons-material/Done'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import PeopleIcon from '@mui/icons-material/People'
import TableHeader from '../../components/tablechoice/defaultmeeting/TableHeader.jsx'
import TableBodyComponent from '../../components/tablechoice/defaultmeeting/TableBodyComponent.jsx'
import TableHeaderClickable from '../../components/tablechoice/bookingmeeting/TableHeaderClickable.jsx'
import {useNavigate, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {createAxios} from '../../createInstance.js'
import {
  confirmMeeting,
  deleteMeeting,
  getAllMeetings,
} from '../../redux/apiRequest/meetingApi.js'
import {getResponseByMeetingId} from '../../redux/apiRequest/responseApi.js'
import {getOtherUser} from '../../redux/apiRequest/userApi.js'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'

function Meeting() {
  const [timeChoiceId, setTimeChoiceId] = useState()
  const [meeting, setMeeting] = useState()
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
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentUserId = useSelector(state => state.auth.login.currentUserId)
  let axiosJWT = createAxios(currentUserId, dispatch, navigate)
  const {meetingId} = useParams()
  useEffect(async () => {
    const meetings = await getAllMeetings(
      currentUserId?.token,
      dispatch,
      axiosJWT,
      currentUserId?.userId,
    )
    const meeting = meetings?.find(meeting => meeting.meetingId == meetingId)
    setMeeting(meeting)
    const choice = await getResponseByMeetingId(
      currentUserId?.token,
      axiosJWT,
      meeting?.meetingId,
    )
    setChoice(choice)
  }, [])

  useEffect(() => {
    const newColumns = getColumns(meeting?.startTime, choice)
    setColumns(newColumns)
  }, [meeting, choice])

  useEffect(() => {
    getRows(choice).then(result => {
      setRows(result)
    })
  }, [choice])

  const getColumns = (startTime, choice) => {
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

  const handleTimeChoiceSelect = event => {
    setTimeChoiceId(event.target.id)
  }

  const handeDeleteMeeting = async (event) => {
    event.preventDefault()
    const res = await deleteMeeting(
      currentUserId?.token,
      axiosJWT,
      meeting?.meetingId,
    )
    navigate(`/dashboard`)
  }

  const handleBookItClick = async event => {
    const meetingInfo = {
      title: meeting?.title,
      startTime: meeting?.startTime[timeChoiceId],
      duration: meeting?.duration,
      location: meeting?.location,
      description: meeting?.description,
      status: 'confirmed',
      meetingId: meeting?.meetingId,
    }
    const res = await confirmMeeting(
      currentUserId?.token,
      axiosJWT,
      navigate,
      meetingInfo,
    )
  }

  return (
    <>
      <NavBar pages={pages} value={1} />
      <Container sx={{mt: '100px', pl: '5%', pr: '5%'}}>
        <Card variant="outlined">
          <Typography
            sx={{p: '24px 24px 0px 24px', fontWeight: 'bold', fontSize: 30}}>
            {meeting?.title}
          </Typography>
          <Grid container spacing={0} sx={{p: '24px'}} rowGap={5}>
            <Grid item xs={6} md={6}>
              <Stack direction="column" spacing={1.5} sx={{mt: '8px'}}>
                <Stack direction="row" spacing={1}>
                  <AccountCircleRoundedIcon sx={{color: '#acaeaf'}} />
                  <Typography sx={{fontSize: 17}}>
                    You are the organizer of the group event.
                  </Typography>
                </Stack>
                {meeting?.status == 'scheduled' ? (
                  <></>
                ) : (
                  <Stack direction="row" spacing={1}>
                    <CalendarMonthIcon sx={{color: '#acaeaf'}} />
                    <Typography sx={{fontSize: 17}}>
                      {`${dayjs(meeting?.startTime).format('MMMM')} ${dayjs(
                        meeting?.startTime,
                      ).format('D')} ${dayjs(meeting?.startTime).format(
                        'YYYY',
                      )} • ${dayjs(meeting?.startTime).format('H')}:${dayjs(
                        meeting?.startTime,
                      ).format('m')} ${dayjs(meeting?.startTime).format(
                        'A',
                      )} - ${dayjs(meeting?.startTime)
                        .add(meeting?.duration, 'm')
                        .format('H')}:${dayjs(meeting?.startTime)
                        .add(meeting?.duration, 'm')
                        .format('m')} ${dayjs(meeting?.startTime)
                        .add(meeting?.duration, 'm')
                        .format('A')}`}
                    </Typography>
                  </Stack>
                )}
                <Stack direction="row" spacing={1}>
                  <AccessTimeRoundedIcon sx={{color: '#acaeaf'}} />
                  <Typography
                    sx={{
                      fontSize: 17,
                    }}>{`${meeting?.duration} minutes`}</Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <LanguageRoundedIcon sx={{color: '#acaeaf'}} />
                  <Typography sx={{fontSize: 17}}>
                    Vietnam, Ho Chi Minh City (GMT+7)
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={6} md={6}>
              <Stack direction="row-reverse" spacing={1} sx={{m: '0 0 0 0'}}>
                {meeting?.status == 'scheduled' ? (
                  <Button
                    variant="contained"
                    sx={{
                      fontWeight: 'bold',
                      textTransform: 'none',
                      fontSize: 15,
                    }}
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `http://localhost:8080/meeting/organize/id/${meeting?.meetingId}/vote`,
                      )
                      alert('Copied')
                    }}>
                    Share invite
                  </Button>
                ) : (
                  <></>
                )}
                <Button
                  variant="outlined"
                  sx={{
                    fontWeight: 'bold',
                    color: '#f83e19',
                    borderColor: '#ebebeb',
                    p: '5 16 5 16',
                    m: '0 0 0 0',
                    textTransform: 'none',
                    fontSize: 15,
                  }}
                  onClick={handeDeleteMeeting}>
                  Delete
                </Button>
                {rows.length == 1 ? (
                  <Button
                    variant="outlined"
                    sx={{
                      fontWeight: 'bold',
                      color: '#666465',
                      borderColor: '#ebebeb',
                      p: '5 16 5 16',
                      m: '0 0 0 0',
                      textTransform: 'none',
                      fontSize: 15,
                    }}
                    onClick={() =>
                      navigate(
                        `/meeting/organize/id/${meeting?.meetingId}/edit`,
                      )
                    }>
                    Edit
                  </Button>
                ) : (
                  <></>
                )}
                {meeting?.status == 'scheduled' ? (
                  <Button
                    variant="outlined"
                    sx={{
                      fontWeight: 'bold',
                      color: '#666465',
                      borderColor: '#ebebeb',
                      p: '5 16 5 16',
                      m: '0 0 0 0',
                      textTransform: 'none',
                      fontSize: 15,
                    }}
                    onClick={() =>
                      navigate(
                        `/meeting/organize/id/${meeting?.meetingId}/preview`,
                      )
                    }>
                    Preview
                  </Button>
                ) : (
                  <></>
                )}
              </Stack>
            </Grid>
            {meeting?.status == 'scheduled' ? (
              <>
                <Grid item xs={6} md={6}>
                  <Typography
                    sx={{fontSize: 17, fontWeight: 'bold', m: '16 0 0 0'}}>
                    Availabilities
                  </Typography>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Stack direction="row-reverse" spacing={2}>
                    <Stack direction="row" spacing={0.5}>
                      <QuestionMarkIcon
                        sx={{color: '#aeaeae', backgroundColor: '#eeeeef'}}
                      />
                      <Typography>pending</Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.5}>
                      <ClearIcon
                        sx={{color: '#aeaeae', backgroundColor: '#eeeeef'}}
                      />
                      <Typography>cannot attend</Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.5}>
                      <DoneIcon
                        sx={{color: '#cd9949', backgroundColor: '#fff1a8'}}
                      />
                      <Typography>if need be</Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.5}>
                      <DoneIcon
                        sx={{color: '#0d8834', backgroundColor: '#e7f8ed'}}
                      />
                      <Typography>yes</Typography>
                    </Stack>
                  </Stack>
                </Grid>
              </>
            ) : (
              <></>
            )}
          </Grid>
          {meeting?.status == 'scheduled' ? (
            <>
              <Divider />
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
                    m: 'auto',
                  }}>
                  {rows.length == 1 ? (
                    <TableHeader columns={columns} />
                  ) : (
                    <TableHeaderClickable
                      columns={columns}
                      timeChoiceId={timeChoiceId}
                      handleTimeChoiceSelect={handleTimeChoiceSelect}
                    />
                  )}
                  <TableBodyComponent rows={rows} columns={columns} />
                </Table>
              </TableContainer>
            </>
          ) : (
            <Stack
              direction="column"
              spacing={1.5}
              sx={{mt: '8px', ml: 3, mb: 3}}>
              <Stack direction="row" spacing={1}>
                <PeopleIcon sx={{color: '#acaeaf'}} />
                <Typography
                  sx={{
                    fontSize: 17,
                    fontWeight: 'bold',
                  }}>{`${rows.length - 1} invited`}</Typography>
              </Stack>
              {rows?.map((row, index) => {
                if (!row?.isOrganizer) {
                  return (
                    <Stack direction="row" spacing={1} sx={{pl: 4}}>
                      <AccountCircleRoundedIcon sx={{color: '#acaeaf'}} />
                      <Typography
                        sx={{
                          fontSize: 17,
                          fontWeight: 'bold',
                        }}>
                        {row?.name}
                      </Typography>
                    </Stack>
                  )
                }
              })}
            </Stack>
          )}
        </Card>
      </Container>
      {rows.length == 1 || !timeChoiceId ? (
        <></>
      ) : (
        <AppBar
          sx={{
            position: 'sticky',
            top: 'auto',
            bottom: 0,
            height: '68px',
            backgroundColor: '#ffffff',
            borderColor: '#000000',
          }}>
          <Toolbar>
            {}
            <Button
              variant="contained"
              sx={{
                m: '12px 12px 12px auto',
                p: '10px 20px 10px 20px',
                textTransform: 'none',
                fontWeight: 'bold',
                fontSize: 15,
              }}
              onClick={handleBookItClick}>
              Book it
            </Button>
          </Toolbar>
        </AppBar>
      )}
    </>
  )
}

export default Meeting