import HomeIcon from '@mui/icons-material/Home'
import React, {Component, useState} from 'react'
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
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import MeetingDashBoard from '../components/MeetingDashBoard.jsx'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const [invitationFilter, setInvitationFilter] = useState('All')
  const [meeting, setMeeting] = useState('')
  const navigate = useNavigate();

  const handleSelectChange = event => {
    setInvitationFilter(event.target.value)
  }

  const handleSearchChange = event => {
    setMeeting(event.target.value)
  }

  const handleSearchSubmit = event => {
    event.preventDefault()
    console.log(meeting)
  }

  return (
    <>
      <NavBar pages={pages} value={0} />
      <Grid container spacing={2} sx={{padding: '100px'}}>
        <Grid item xs={8} md={8}>
          <Card variant="outlined">
            <Grid container spacing={2} sx={{padding: '20px'}}>
              <Grid item xs={6} md={6}>
                <Grid container spacing={0}>
                  <Grid item xs={6} md={6}>
                    <Typography
                      sx={{fontSize: 20, fontWeight: 'bold', marginTop: '10px'}}
                      color="#000">
                      Invitations
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <FormControl sx={{maxWidth: 200}}>
                      <InputLabel id="invitations-select--label">
                        Filter
                      </InputLabel>
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
                    aria-label="search">
                    <SearchIcon />
                  </IconButton>
                </Paper>
              </Grid>
            </Grid>
            <MeetingDashBoard />
            <MeetingDashBoard />
          </Card>
        </Grid>
        <Grid item xs={4} md={4}>
          <Card variant="outlined">
            <Typography sx={{margin: '16px', fontSize: 19, fontWeight: 'bold'}}>
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
              }}
              onClick={() => navigate('/meeting/organize/groups')}>
              Create a new meeting page
            </Button>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default Dashboard
