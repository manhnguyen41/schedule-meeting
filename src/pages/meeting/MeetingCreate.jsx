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
  Container,
  Divider,
  TextField,
  OutlinedInput,
  ToggleButtonGroup,
  ToggleButton,
  Stack,
  AppBar,
  Toolbar,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker'
import dayjs from 'dayjs'
import ClearIcon from '@mui/icons-material/Clear'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'

function MeetingCreate() {
  const [invitationFilter, setInvitationFilter] = useState('All')
  const [meeting, setMeeting] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [duration, setDuration] = useState('60')
  const [isCustomDuration, setIsCustomDuration] = useState(false)
  const [durationNum, setDurationNum] = useState(60)
  const [timeType, setTimeType] = useState('minute')
  const [times, setTimes] = useState([dayjs()])
  const navigate = useNavigate();

  useEffect(() => {
    if (timeType === 'minute') {
      setDurationNum(60)
    } else {
      setDurationNum(1)
    }
  }, [timeType, isCustomDuration])

  const handleTitleChange = event => {
    setTitle(event.target.value)
  }

  const handleDescriptionChange = event => {
    setDescription(event.target.value)
  }

  const handleLocationChange = event => {
    setDescription(event.target.value)
  }

  const handleDurationChange = (event, newDuration) => {
    if (newDuration !== null) {
      setDuration(newDuration)
    }
    if (newDuration === 'Custom') {
      setIsCustomDuration(true)
    } else if (newDuration !== null) {
      setIsCustomDuration(false)
      setDurationNum(parseInt(newDuration))
      setTimeType('minute')
    }
  }

  const handleDurationNumChange = event => {
    setDurationNum(event.target.value)
  }

  const handleTimeTypeChange = event => {
    setTimeType(event.target.value)
  }

  return (
    <>
      <NavBar pages={pages} value={1} />
      <Container sx={{mt: '100px', pl: '5%', pr: '5%'}}>
        <Card variant="outlined" sx={{p: '24px', mb: '8px'}}>
          <Typography sx={{mb: '16px', fontSize: 33}}>
            Create meeting
          </Typography>
          <Divider />
          <FormControl variant="outlined" fullWidth>
            <Typography sx={{mt: '16px', fontSize: 15, color: '#646465'}}>
              Title
            </Typography>
            <OutlinedInput
              id="title"
              value={title}
              onChange={handleTitleChange}
              placeholder="What's the occasion?"
              required
            />
          </FormControl>
          <FormControl variant="outlined" fullWidth>
            <Typography sx={{mt: '32px', fontSize: 15}}>
              Description (optional)
            </Typography>
            <OutlinedInput
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Here you can include things like an agenda, instructions, or other details"
            />
          </FormControl>
          <FormControl variant="outlined" fullWidth>
            <Typography sx={{mt: '32px', fontSize: 15}}>
              Location (optional)
            </Typography>
            <OutlinedInput
              id="location"
              value={location}
              onChange={handleLocationChange}
              placeholder="Where will this happen?"
            />
          </FormControl>
        </Card>
        <Card variant="outlined" sx={{p: '24px'}}>
          <Typography sx={{mb: '16px', fontSize: 25}}>
            Add your times
          </Typography>
          <Typography sx={{fontSize: 15}}>Duration</Typography>
          <ToggleButtonGroup
            value={duration}
            exclusive
            onChange={handleDurationChange}
            aria-label="duration"
            sx={{mb: '8px', mr: '55%'}}>
            <ToggleButton
              value="15"
              aria-label="15 min"
              sx={{
                pl: '16px',
                pr: '16px',
                pt: '8px',
                pb: '8px',
                fontSize: 15,
                borderWidth: '2px',
                textTransform: 'none',
              }}>
              15 min
            </ToggleButton>
            <ToggleButton
              value="30"
              aria-label="30 min"
              sx={{
                pl: '16px',
                pr: '16px',
                pt: '8px',
                pb: '8px',
                fontSize: 15,
                borderWidth: '2px',
                textTransform: 'none',
              }}>
              30 min
            </ToggleButton>
            <ToggleButton
              value="60"
              aria-label="60 min"
              sx={{
                pl: '16px',
                pr: '16px',
                pt: '8px',
                pb: '8px',
                fontSize: 15,
                borderWidth: '2px',
                textTransform: 'none',
              }}>
              60 min
            </ToggleButton>
            <ToggleButton
              value="1440"
              aria-label="All day"
              sx={{
                pl: '16px',
                pr: '16px',
                pt: '8px',
                pb: '8px',
                fontSize: 15,
                borderWidth: '2px',
                textTransform: 'none',
              }}>
              All day
            </ToggleButton>
            <ToggleButton
              value="Custom"
              aria-label="Custom"
              sx={{
                pl: '16px',
                pr: '16px',
                pt: '8px',
                pb: '8px',
                fontSize: 15,
                borderWidth: '2px',
                textTransform: 'none',
              }}>
              Custom
            </ToggleButton>
          </ToggleButtonGroup>
          {isCustomDuration ? (
            <FormControl variant="outlined" fullWidth>
              <Typography sx={{fontSize: 15, color: '#646465'}}>
                Custom duration
              </Typography>
              <Stack direction="row" spacing={1}>
                <OutlinedInput
                  sx={{maxWidth: '90px', fontSize: 15}}
                  value={durationNum}
                  onChange={handleDurationNumChange}
                />
                <Select
                  sx={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: '#67676d',
                  }}
                  labelId="time-type-select--label"
                  id="time-type-select"
                  value={timeType}
                  autoWidth
                  onChange={handleTimeTypeChange}
                  displayEmpty>
                  <MenuItem value={'minute'}>min</MenuItem>
                  <MenuItem value={'hour'}>hour</MenuItem>
                </Select>
              </Stack>
            </FormControl>
          ) : (
            <></>
          )}
          {times?.map((time, index) => (
            <Stack
              direction="row"
              spacing={5}
              sx={{mt: '8px', mr: '10%'}}
              id={index}>
              <DateTimePicker
                value={time}
                disablePast
                views={['year', 'month', 'day', 'hours', 'minutes']}
                onChange={newValue => {
                  const newTimes = [...times]
                  newTimes[index] = newValue
                  setTimes(newTimes)
                }}
              />
              <DateTimePicker
                value={time.add(durationNum, timeType)}
                disablePast
                views={['year', 'month', 'day', 'hours', 'minutes']}
                disabled
              />
              <IconButton
                aria-label="delete"
                onClick={() => {
                  const newTimes = [...times]
                  newTimes.splice(index, 1)
                  setTimes(newTimes)
                }}>
                <ClearIcon />
              </IconButton>
            </Stack>
          ))}
          <IconButton
            sx={{mt: '8px'}}
            onClick={() => {
              const newTimes = [...times]
              newTimes.push(dayjs())
              setTimes(newTimes)
            }}>
            <AddIcon />
          </IconButton>
        </Card>
      </Container>
      <AppBar
        sx={{
          position: 'sticky',
          top: 'auto',
          bottom: 0,
          height: '68px',
          backgroundColor: '#ffffff',
          borderColor: '#000000',
        }}>
        <Toolbar>
          <Typography
            sx={{
              m: '12px 0px 12px 12px',
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: 20,
              color: '#000000',
            }}>
            {times.length == 1 ? `1 time selected` : `${times.length} times selected`}
          </Typography>
          <Button
            variant="contained"
            sx={{
              m: '12px 12px 12px auto',
              p: '10px 20px 10px 20px',
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: 15,
            }}
            onClick={() => navigate('/meeting/organize/id')}>
            Create and share
          </Button>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default MeetingCreate
