import HomeIcon from '@mui/icons-material/Home'
import React, {Component, useEffect, useState} from 'react'
import NavBar from '../components/NavBar.jsx'
import {pages} from '../globalVar.js'
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
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import MeetingDashBoard from '../components/MeetingDashBoard.jsx'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {deleteMeeting, getAllMeetings, getConfirmedMeetings, getReceivedMeetings, getSentMeetings} from '../redux/apiRequest/meetingApi.js'
import {createAxios} from '../createInstance.js'

function Dashboard() {
  const [invitationFilter, setInvitationFilter] = useState('All')
  const [meeting, setMeeting] = useState('')
  const [meetings, setMeetings] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentUserId = useSelector(state => state.auth.login.currentUserId)
  let axiosJWT = createAxios(currentUserId, dispatch, navigate)
  useEffect(async () => {
    const meetings = await getAllMeetings(
      currentUserId?.token,
      dispatch,
      axiosJWT,
      currentUserId?.userId,
    )
    setMeetings(meetings)
  }, [])

  useEffect(async () => {
    switch (invitationFilter) {
      case 'All': {
        const newMeetings = await getAllMeetings(
          currentUserId?.token,
          dispatch,
          axiosJWT,
          currentUserId?.userId,
        )
        setMeetings(newMeetings)
        break
      }
      case 'Sent': {
        const newMeetings = await getSentMeetings(
          currentUserId?.token,
          dispatch,
          axiosJWT,
          currentUserId?.userId,
        )
        setMeetings(newMeetings)
        break
      }
      case 'Received': {
        const newMeetings = await getReceivedMeetings(
          currentUserId?.token,
          dispatch,
          axiosJWT,
          currentUserId?.userId,
        )
        setMeetings(newMeetings)
        break
      }
      case 'Confirmed': {
        const newMeetings = await getConfirmedMeetings(
          currentUserId?.token,
          dispatch,
          axiosJWT,
          currentUserId?.userId,
        )
        setMeetings(newMeetings)
        break
      }
      default:
    }
  }, [invitationFilter])

  const handleSelectChange = event => {
    setInvitationFilter(event.target.value)
  }

  const handleSearchChange = event => {
    setMeeting(event.target.value)
  }

  const handleSearchSubmit = event => {
    event.preventDefault()
    const newMeetings = meetings.filter(item => item.title.includes(meeting))
    console.log(newMeetings)
    setMeetings(newMeetings)
  }

  const handeDeleteMeeting = async (event, meeting, callback) => {
    const res = await deleteMeeting(
      currentUserId?.token,
      axiosJWT,
      meeting.meetingId,
    )
    callback()
    const meetings = await getAllMeetings(
      currentUserId?.token,
      dispatch,
      axiosJWT,
      currentUserId?.userId,
    )
    setMeetings(meetings)
  }

  console.log(meetings);

  return (
    <>
      <NavBar pages={pages} value={0} />
      <Container sx={{mt: '100px', pl: '5%', pr: '5%'}}>
        <Grid container spacing={2}>
          <Grid item xs={8} md={8}>
            <Card variant="outlined">
              <Grid container spacing={2} sx={{padding: '20px'}}>
                <Grid item xs={6} md={6}>
                  <Grid container spacing={0}>
                    <Grid item xs={6} md={6}>
                      <Typography
                        sx={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          marginTop: '10px',
                        }}
                        color="#000">
                        Invitations
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <FormControl sx={{maxWidth: 200}}>
                        <Select
                          sx={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: '#67676d',
                          }}
                          labelId="invitations-select--label"
                          id="invitations-select"
                          value={invitationFilter}
                          autoWidth
                          onChange={handleSelectChange}
                          displayEmpty>
                          <MenuItem value={'All'}>All</MenuItem>
                          <MenuItem value={'Sent'}>Sent</MenuItem>
                          <MenuItem value={'Received'}>Received</MenuItem>
                          <MenuItem value={'Confirmed'}>Confirmed</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Paper
                    component="form"
                    sx={{
                      p: '2px 4px',
                      display: 'flex',
                      alignItems: 'center',
                      maxWidth: 400,
                    }}
                    onSubmit={handleSearchSubmit}>
                    <InputBase
                      sx={{ml: 1, flex: 1}}
                      placeholder="Search"
                      onChange={handleSearchChange}
                    />
                    <IconButton
                      type="button"
                      sx={{p: '10px'}}
                      aria-label="search"
                      onClick={handleSearchSubmit}>
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                </Grid>
              </Grid>
              {meetings?.map(meeting => (
                <MeetingDashBoard 
                  meeting={meeting}
                  handeDeleteMeeting={handeDeleteMeeting}
                />
              ))}
            </Card>
          </Grid>
          <Grid item xs={4} md={4}>
            <Card variant="outlined">
              <Typography
                sx={{margin: '16px', fontSize: 19, fontWeight: 'bold'}}>
                Your meeting pages
              </Typography>
              <Typography
                variant="body1"
                sx={{pl: '30px', pr: '30px', textAlign: 'center'}}>
                The fastest way to find the right time for a meeting without
                having access to people's calendars.
              </Typography>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  margin: '16px',
                  fontSize: 15,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  width: '90%',
                  textTransform: 'none',
                }}
                onClick={() => navigate('/meeting/organize/groups')}>
                Create a new meeting page
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Dashboard
