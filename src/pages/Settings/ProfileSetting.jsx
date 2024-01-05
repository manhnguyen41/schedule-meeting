import React, {useEffect, useState} from 'react'
import NavBar from '../../components/NavBar.jsx'
import {pages} from '../../globalVar.js'
import {
  Card,
  Grid,
  Typography,
  MenuItem,
  FormControl,
  Select,
  Button,
  Divider,
  OutlinedInput,
  Stack,
  Container,
} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import SettingMenu from '../../components/settingscomponent/SettingMenu.jsx'
import {useDispatch, useSelector} from 'react-redux'
import {createAxios} from '../../createInstance.js'
import {
  deleteUser,
  getUser,
  updateUser,
} from '../../redux/apiRequest/userApi.js'

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
      navigate,
      axiosJWT,
      currentUserId?.userId,
    )
    setUser(user)
  }, [])

  const handleNameChange = event => {
    setName(event.target.value)
  }

  const handleNameSubmit = async event => {
    event.preventDefault()
    const username = await updateUser(
      currentUserId?.token,
      dispatch,
      axiosJWT,
      currentUserId?.userId,
      name,
    )
    const newUser = {...user, username: username}
    setUser(newUser)
    setIsChanging(false)
  }

  const handleChangeClick = event => {
    setName(user?.username)
    setIsChanging(true)
  }

  const handleCancelClick = event => {
    setIsChanging(false)
  }

  const handleDeleteAccClick = async event => {
    event.preventDefault()
    const status = await deleteUser(
      currentUserId?.token,
      dispatch,
      navigate,
      axiosJWT,
      currentUserId?.userId,
    )
  }

  return (
    <>
      <NavBar pages={pages} value={1} />
      <Container sx={{mt: '100px', pl: '5%', pr: '5%'}}>
        <Grid container spacing={2}>
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
                      textTransform: 'none',
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
                      textTransform: 'none',
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
                    textTransform: 'none',
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
                displayEmpty>
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
                  width: '90%',
                }}
                labelId="invitations-select--label"
                id="invitations-select"
                value="Vietnam - Ho Chi Minh City, Da Nang, Biên Hòa, Nha Trang"
                displayEmpty>
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
                  textTransform: 'none',
                }}
                onClick={handleDeleteAccClick}>
                Delete account
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default ProfileSetting