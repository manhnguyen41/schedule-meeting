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
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

function MeetingDashBoard(props) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Card sx={{margin: '20px', color: '#aeacac'}}>
        <CardActionArea>
          <Grid container spacing={0} sx={{margin: '30px'}} maxWidth={540}>
            <Grid item xs={1} md={1}>
              <Typography
                sx={{fontWeight: 'bold', paddingTop: '5px', fontSize: 21}}>
                01
              </Typography>
              <Typography sx={{fontSize: 15}}>DEC</Typography>
            </Grid>
            <Grid item xs={5} md={5}>
              <Typography sx={{fontWeight: 'bold'}}>Title</Typography>
              <Typography
                sx={{
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}>
                <DoneIcon sx={{fontSize: 17, color: '#048434', mr: '8px'}} />
                12/1/2023 to 12/1/2023
              </Typography>
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}>
                <PeopleIcon sx={{fontSize: 17, mr: '8px'}} />0 invitees
              </Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <IconButton
                type="button"
                sx={{p: '10px', ml: '226px', mt: '13px'}}
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
                <MenuItem onClick={handleClose}>
                  <EditIcon sx={{mr: '10px'}} />
                  Edit
                </MenuItem>
                <MenuItem onClick={handleClose} sx={{color: '#f83e19'}}>
                  <DeleteIcon sx={{mr: '10px'}} />
                  Delete
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </CardActionArea>
      </Card>
    </>
  )
}

export default MeetingDashBoard
