import {
  Card,
  Grid,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  CardActionArea,
} from '@mui/material'
import DoneIcon from '@mui/icons-material/Done'
import PeopleIcon from '@mui/icons-material/People'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import {useState} from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import dayjs from 'dayjs'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {createAxios} from '../createInstance'

function MeetingDashBoard(props) {
  const {meeting, handeDeleteMeeting} = props
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()
  const currentUserId = useSelector(state => state.auth.login.currentUserId)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMeetingClick = event => {
    navigate(
      currentUserId?.userId == meeting.organizerId
        ? `/meeting/organize/id/${meeting.meetingId}`
        : `/meeting/organize/id/${meeting.meetingId}/vote`,
    )
  }

  return (
    <>
      <Card
        sx={{
          margin: '20px',
          color: meeting?.status == 'scheduled' ? '#000000' : '#aeacac',
        }}>
        <Grid
          container
          spacing={2}
          sx={{my: '30px', mx: '10px'}}
          maxWidth={540}>
          <Grid item xs={1.5} md={1.5}>
            <CardActionArea onClick={handleMeetingClick}>
              {meeting?.status == 'scheduled' ? (
                <AccountCircleRoundedIcon sx={{fontSize: 40, mt: '15px'}} />
              ) : (
                <>
                  <Typography
                    sx={{fontWeight: 'bold', paddingTop: '5px', fontSize: 21}}>
                    {dayjs(meeting.startTime).format('DD')}
                  </Typography>
                  <Typography sx={{fontSize: 15, textTransform: 'uppercase'}}>
                    {dayjs(meeting.startTime).format('MMM')}
                  </Typography>
                </>
              )}
            </CardActionArea>
          </Grid>
          <Grid item xs={9.5} md={9.5}>
            <CardActionArea onClick={(handleMeetingClick)}>
              <Typography sx={{fontWeight: 'bold'}}>{meeting.title}</Typography>
              {meeting?.status == 'scheduled' ? (
                <Typography
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}>
                  <CalendarMonthIcon sx={{fontSize: 20, mr: '6px'}} />
                  {`${
                    Object.values(meeting.startTime).length
                  } options`}
                </Typography>
              ) : (
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}>
                  <DoneIcon sx={{fontSize: 17, color: '#048434', mr: '8px'}} />
                  {`${dayjs(meeting.startTime).format(
                    'MM/DD/YYYY',
                  )} to ${dayjs(meeting.startTime)
                    .add(meeting.duration, 'm')
                    .format('MM/DD/YYYY')}`}
                </Typography>
              )}
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}>
                <PeopleIcon sx={{fontSize: 17, mr: '8px'}} />0 invitees
              </Typography>
            </CardActionArea>
          </Grid>
          <Grid item xs={1} md={1}>
            {currentUserId?.userId == meeting.organizerId ? (
              <>
                <IconButton
                  type="button"
                  sx={{p: '10px', ml: '99%', mt: '13px'}}
                  aria-label="more"
                  aria-controls={open ? 'meeting-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="meeting-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'button',
                  }}>
                  <MenuItem
                    onClick={(event) => handeDeleteMeeting(event, meeting, handleClose)}
                    sx={{color: '#f83e19'}}>
                    <DeleteIcon sx={{mr: '10px'}} />
                    Delete
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </Card>
    </>
  )
}

export default MeetingDashBoard
