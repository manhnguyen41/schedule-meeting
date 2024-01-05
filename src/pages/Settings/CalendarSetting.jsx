import React, {useState} from 'react'
import NavBar from '../../components/NavBar.jsx'
import {pages} from '../../globalVar.js'
import {Card, Grid, Typography, Container} from '@mui/material'
import SettingMenu from '../../components/settingscomponent/SettingMenu.jsx'

function CalendarSetting() {
  const [meeting, setMeeting] = useState('')

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
