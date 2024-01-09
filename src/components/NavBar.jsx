import {AppBar, Toolbar, Typography, Tabs, Tab, Button} from '@mui/material'
import GroupsIcon from '@mui/icons-material/Groups';
import {Link, useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {logOut} from '../redux/apirequest/loginApi'
import {createAxios} from '../createInstance'
import { getUser } from '../redux/apirequest/userApi';

function NavBar(props) {
  const [value, setValue] = useState(props.value)
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [user, setUser] = useState(null)
  const [openPopup, setOpenPopup] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentUserId = useSelector(state => state.auth.login.currentUserId)
  let axiosJWT = createAxios(currentUserId, dispatch, navigate)
  useEffect(async () => {
    const user = await getUser(currentUserId?.token, dispatch, navigate, axiosJWT, currentUserId?.userId)
    setUser(user)
  }, [])

  const handleLogOut = () => {
    logOut(
      dispatch,
      navigate,
    )
  }

  return (
    <>
      <AppBar sx={{background: '#063970'}}>
        <Toolbar>
          <GroupsIcon />
          <Tabs
            value={value}
            onChange={(event, value) => {
              setValue(value)
            }}
            sx={{marginLeft: '10px'}}
            textColor="inherit"
            >
            {currentUserId?.token ? (
              props.pages.map(({page, path}, index) => (
                <Tab key={index} label={page} component={Link} to={path} />
              ))
            ) : (
              <Tab key={0} label={'Dashboard'} component={Link} to={'/dashboard'} />
            )}
          </Tabs>
          {currentUserId?.token ? (
            <>
              <Button
                sx={{marginLeft: 'auto', textTransform: 'none'}}
                variant="contained"
                onClick={() => navigate('/meeting/organize/groups')}>
                Create
              </Button>
              <Button
                sx={{marginLeft: '10px', textTransform: 'none'}}
                variant="contained"
                onClick={() => navigate(`/settings`)}>
                Hi, {user?.username}
              </Button>
              <Button
                sx={{marginLeft: '10px', textTransform: 'none'}}
                variant="contained"
                onClick={() => {handleLogOut()}}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                sx={{marginLeft: 'auto', textTransform: 'none'}}
                variant="contained"
                onClick={() => navigate(`/login`)}>
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  )
}

export default NavBar