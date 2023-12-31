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
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import MeetingDashBoard from '../../components/MeetingDashBoard.jsx'
import {Link} from 'react-router-dom'
import SettingMenu from '../../components/settingscomponent/SettingMenu.jsx'
import SettingCard from '../../components/settingscomponent/SettingCard.jsx'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'

function Settings() {
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
      <Grid container spacing={2} sx={{padding: '100px'}}>
        <Grid item xs={4} md={4}>
          <SettingMenu selectedIndex={0} />
        </Grid>
        <Grid item xs={8} md={8}>
          <Card variant="outlined">
            <Typography
              sx={{
                pt: '16px',
                pb: '24px',
                pl: '24px',
                pr: '16px',
                fontSize: 22,
              }}>
              Overview
            </Typography>
            <Grid
              container
              spacing={3}
              sx={{pl: '24px', pr: '24px', pb: '40px', gridAutoRows: '1fr'}}>
              <Grid item xs={4} md={4}>
                <SettingCard
                  icon={
                    <AccountBoxIcon
                      sx={{alignContent: 'center', fontSize: 70}}
                    />
                  }
                  title={'Profile'}
                  subTitle={'Manage your profile and preferences'}
                  url={`profile`}
                />
              </Grid>
              <Grid item xs={4} md={4}>
                <SettingCard
                  icon={
                    <CalendarMonthIcon
                      sx={{alignContent: 'center', fontSize: 70}}
                    />
                  }
                  title={'Connected calendars'}
                  subTitle={'Sync your calendars to schedule more effectively'}
                  url={`calendar`}
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default Settings
