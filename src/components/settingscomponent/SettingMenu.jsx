import React, {useState} from 'react'
import {
  Card,
  Typography,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import {Link} from 'react-router-dom'

function SettingMenu(props) {
  const [selectedIndex, setSelectedIndex] = useState(props.selectedIndex)

  return (
    <>
      <Card variant="outlined">
        <Typography
          sx={{
            pt: '32px',
            pb: '32px',
            pl: '24px',
            fontSize: 26,
            fontWeight: 'bold',
          }}>
          Account
        </Typography>
        <List component="nav">
          {[
            {text: 'Overview', path: '/settings'},
            {text: 'Profile', path: '/settings/profile'},
            {text: 'Connected Calendars', path: '/settings/calendar'},
          ].map(({text, path}, index) => (
            <ListItemButton
              selected={selectedIndex === index}
              onClick={event => {
                setSelectedIndex(index)
              }}
              disablePadding
              key={index}
              component={Link}
              to={path}>
              <ListItemText primary={text} />
            </ListItemButton>
          ))}
        </List>
      </Card>
    </>
  )
}

export default SettingMenu
