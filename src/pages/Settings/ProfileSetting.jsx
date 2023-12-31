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
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  TextField,
  OutlinedInput,
  Stack,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import MeetingDashBoard from '../../components/MeetingDashBoard.jsx'
import {Link, useNavigate} from 'react-router-dom'
import SettingMenu from '../../components/settingscomponent/SettingMenu.jsx'
import SettingCard from '../../components/settingscomponent/SettingCard.jsx'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import {useDispatch, useSelector} from 'react-redux'
import {createAxios} from '../../createInstance.js'
import {getUser} from '../../redux/apiRequest/userApi.js'

function ProfileSetting() {
  const [user, setUser] = useState(null)
  const [isChanging, setIsChanging] = useState(false)
  const [name, setName] = useState('')
  const currentUserId = useSelector(state => state.auth.login.currentUserId)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let axiosJWT = createAxios(currentUserId, dispatch, navigate)
  useEffect(async () => {
    const user = await getUser(
      currentUserId?.token,
      dispatch,
      axiosJWT,
      currentUserId?.userId,
    )
    setUser(user)
  }, [])

  const handleNameChange = event => {
    setName(event.target.value)
  }

  const handleNameSubmit = event => {
    event.preventDefault()
    console.log(name)
  }

  const handleChangeClick = event => {
    setName(user?.username)
    setIsChanging(true)
  }

  const handleCancelClick = event => {
    setIsChanging(false)
  }

  const handleDeleteAccClick = event => {
    alert("Deleted")
  }

  return (
    <>
      <NavBar pages={pages} value={1} />
      <Grid container spacing={2} sx={{padding: '100px'}}>
        <Grid item xs={4} md={4}>
          <SettingMenu selectedIndex={1} />
        </Grid>
        <Grid item xs={8} md={8}>
          <Card variant="outlined">
            <Typography
              sx={{
                pt: '16px',
                pl: '24px',
                pr: '16px',
                fontSize: 22,
              }}>
              Profile
            </Typography>
            <Typography
              sx={{
                pb: '24px',
                pl: '24px',
                pr: '16px',
                fontSize: 18,
              }}>
              Manage your profile information and preferences.
            </Typography>
            <Typography
              sx={{
                pb: '16px',
                pl: '24px',
                pr: '16px',
                fontSize: 20,
              }}>
              General
            </Typography>
            <Divider />
            <Typography
              sx={{
                pl: '24px',
                pt: '24px',
                pr: '24px',
                mb: '8px',
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              Name
            </Typography>
            {isChanging ? (
              <FormControl
                variant="outlined"
                sx={{
                  pl: '24px',
                  pr: '24px',
                  mb: '8px',
                }}
                fullWidth>
                <OutlinedInput
                  id="name"
                  value={name}
                  onChange={handleNameChange}
                />
              </FormControl>
            ) : (
              <Typography
                sx={{
                  pl: '24px',
                  pr: '24px',
                  fontSize: 18,
                }}>
                {user?.username}
              </Typography>
            )}
            {isChanging ? (
              <Stack
                direction="row"
                spacing={0}
                sx={{
                  ml: '24px',
                  mr: '24px',
                  mt: '16px',
                  mb: '24px',
                }}>
                <Button
                  variant="outlined"
                  sx={{
                    pl: '16px',
                    pr: '16px',
                    fontWeight: 'bold',
                    color: '#666465',
                    borderColor: '#ebebeb',
                  }}
                  onClick={handleCancelClick}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    pl: '16px',
                    pr: '16px',
                    fontWeight: 'bold',
                    ml: '16px',
                  }}
                  onClick={handleNameSubmit}>
                  Save
                </Button>
              </Stack>
            ) : (
              <Button
                variant="outlined"
                sx={{
                  ml: '24px',
                  mr: '24px',
                  pl: '16px',
                  pr: '16px',
                  mt: '16px',
                  mb: '24px',
                  fontWeight: 'bold',
                  color: '#666465',
                  borderColor: '#ebebeb',
                }}
                onClick={handleChangeClick}>
                Change
              </Button>
            )}
            <Typography
              sx={{
                pb: '16px',
                pl: '24px',
                pr: '16px',
                fontSize: 20,
              }}>
              Preferences
            </Typography>
            <Divider />
            <Typography
              sx={{
                pl: '24px',
                pt: '32px',
                pr: '24px',
                mb: '8px',
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              Language
            </Typography>
            <Select
              sx={{
                ml: '24px',
                mr: '24px',
                mb: '40px',
                mt: '8px',
                fontSize: 18,
                fontWeight: 'bold',
                color: '#67676d',
                width: '40%',
              }}
              labelId="invitations-select--label"
              id="invitations-select"
              value="English"
              label="Invitations">
              <MenuItem value={'English'}>English</MenuItem>
            </Select>
            <Divider />
            <Typography
              sx={{
                pl: '24px',
                pt: '24px',
                pr: '24px',
                mb: '8px',
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              Default time zone
            </Typography>
            <Select
              sx={{
                ml: '24px',
                mr: '24px',
                mb: '40px',
                fontSize: 18,
                fontWeight: 'bold',
                color: '#67676d',
                width: '90%'
              }}
              labelId="invitations-select--label"
              id="invitations-select"
              value="Vietnam - Ho Chi Minh City, Da Nang, Biên Hòa, Nha Trang"
              label="Invitations">
              <MenuItem
                value={
                  'Vietnam - Ho Chi Minh City, Da Nang, Biên Hòa, Nha Trang'
                }>
                Vietnam - Ho Chi Minh City, Da Nang, Biên Hòa, Nha Trang
              </MenuItem>
            </Select>
            <Divider />
            <Button
                variant="outlined"
                sx={{
                  ml: '24px',
                  mr: '24px',
                  pl: '16px',
                  pr: '16px',
                  mt: '24px',
                  mb: '24px',
                  fontWeight: 'bold',
                  color: '#666465',
                  borderColor: '#ebebeb',
                }}
                onClick={handleDeleteAccClick}>
                Delete account
              </Button>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default ProfileSetting
