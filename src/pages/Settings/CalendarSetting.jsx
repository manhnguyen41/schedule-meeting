import HomeIcon from '@mui/icons-material/Home'
import React, {Component, useState} from 'react'
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
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Container,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import MeetingDashBoard from '../../components/MeetingDashBoard.jsx'
import {Link} from 'react-router-dom'
import SettingMenu from '../../components/settingscomponent/SettingMenu.jsx'
import SettingCard from '../../components/settingscomponent/SettingCard.jsx'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'

function CalendarSetting() {
  const [invitationFilter, setInvitationFilter] = useState('All')
  const [meeting, setMeeting] = useState('')

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
      <NavBar pages={pages} value={1} />
      <Container sx={{mt: '100px', pl: '5%', pr: '5%'}}>
        <Grid container spacing={2}>
          <Grid item xs={4} md={4}>
            <SettingMenu selectedIndex={2} />
          </Grid>
          <Grid item xs={8} md={8}>
            <Card variant="outlined">
              <Typography
                sx={{
                  p: '24px',
                  fontSize: 40,
                }}>
                Comming soon ...
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default CalendarSetting
