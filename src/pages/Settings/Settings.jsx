import React, {useState} from 'react'
import NavBar from '../../components/NavBar.jsx'
import {pages} from '../../globalVar.js'
import {
  Card,
  Grid,
  Typography,
  Container,
} from '@mui/material'
import SettingMenu from '../../components/settingscomponent/SettingMenu.jsx'
import SettingCard from '../../components/settingscomponent/SettingCard.jsx'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'

function Settings() {
  return (
    <>
      <NavBar pages={pages} value={1} />
      <Container sx={{mt: '100px', pl: '5%', pr: '5%'}}>
        <Grid container spacing={2}>
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
                    subTitle={
                      'Sync your calendars to schedule more effectively'
                    }
                    url={`calendar`}
                  />
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Settings
