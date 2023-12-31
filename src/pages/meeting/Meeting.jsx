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
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded'
import DoneIcon from '@mui/icons-material/Done'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import PeopleIcon from '@mui/icons-material/People'
import TableHeader from '../../components/tablechoice/TableHeader.jsx'
import TableBodyCom from '../../components/tablechoice/TableBodyCom.jsx'
import TableHeaderClickable from '../../components/tablechoice/TableHeaderClickable.jsx'

function createData(name, choice) {
  return {name, choice}
}

const rows = [
  createData('Manh', {0: 'yes', 1: 'yes'}),
  // createData('Manh1', {0: 'if need be', 1: 'yes'}),
  // createData('Manh2', {0: 'cannot attend', 1: 'yes'}),
]

const columns = [
  {
    id: 0,
    startTime: dayjs().add(1, 'minute'),
    endTime: dayjs(),
    numOfChoice: 1,
  },
  {
    id: 1,
    startTime: dayjs().add(2, 'minute'),
    endTime: dayjs(),
    numOfChoice: 1,
  },
]

function Meeting() {
  const [timeChoiceId, setTimeChoiceId] = useState()

  const handleTimeChoiceSelect = event => {
    setTimeChoiceId(event.target.id)
  }

  return (
    <>
      <NavBar pages={pages} value={1} />
      <Container sx={{mt: '100px', pl: '5%', pr: '5%'}}>
        <Card variant="outlined">
          <Typography
            sx={{p: '24px 24px 0px 24px', fontWeight: 'bold', fontSize: 30}}>
            Title
          </Typography>
          <Grid container spacing={0} sx={{p: '24px'}} rowGap={5}>
            <Grid item xs={6} md={6}>
              <Stack direction="column" spacing={1.5} sx={{mt: '8px'}}>
                <Stack direction="row" spacing={1}>
                  <AccountCircleRoundedIcon sx={{color: '#acaeaf'}} />
                  <Typography sx={{fontSize: 17}}>
                    You are the organizer of the group event.
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <AccessTimeRoundedIcon sx={{color: '#acaeaf'}} />
                  <Typography sx={{fontSize: 17}}>30 minutes</Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <LanguageRoundedIcon sx={{color: '#acaeaf'}} />
                  <Typography sx={{fontSize: 17}}>
                    Vietnam, Ho Chi Minh City (GMT+7)
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={6} md={6}>
              <Stack direction="row-reverse" spacing={1} sx={{m: '0 0 0 0'}}>
                <Button
                  variant="contained"
                  sx={{
                    fontWeight: 'bold',
                    textTransform: 'none',
                    fontSize: 15,
                  }}
                  onClick={() => {}}>
                  Share invite
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    fontWeight: 'bold',
                    color: '#f83e19',
                    borderColor: '#ebebeb',
                    p: '5 16 5 16',
                    m: '0 0 0 0',
                    textTransform: 'none',
                    fontSize: 15,
                  }}
                  onClick={() => {}}>
                  Delete
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    fontWeight: 'bold',
                    color: '#666465',
                    borderColor: '#ebebeb',
                    p: '5 16 5 16',
                    m: '0 0 0 0',
                    textTransform: 'none',
                    fontSize: 15,
                  }}
                  onClick={() => {}}>
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    fontWeight: 'bold',
                    color: '#666465',
                    borderColor: '#ebebeb',
                    p: '5 16 5 16',
                    m: '0 0 0 0',
                    textTransform: 'none',
                    fontSize: 15,
                  }}
                  onClick={() => {}}>
                  Preview
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={6} md={6}>
              <Typography
                sx={{fontSize: 17, fontWeight: 'bold', m: '16 0 0 0'}}>
                Availabilities
              </Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <Stack direction="row-reverse" spacing={2}>
                <Stack direction="row" spacing={0.5}>
                  <QuestionMarkIcon
                    sx={{color: '#aeaeae', backgroundColor: '#eeeeef'}}
                  />
                  <Typography>pending</Typography>
                </Stack>
                <Stack direction="row" spacing={0.5}>
                  <ClearIcon
                    sx={{color: '#aeaeae', backgroundColor: '#eeeeef'}}
                  />
                  <Typography>cannot attend</Typography>
                </Stack>
                <Stack direction="row" spacing={0.5}>
                  <DoneIcon
                    sx={{color: '#cd9949', backgroundColor: '#fff1a8'}}
                  />
                  <Typography>if need be</Typography>
                </Stack>
                <Stack direction="row" spacing={0.5}>
                  <DoneIcon
                    sx={{color: '#0d8834', backgroundColor: '#e7f8ed'}}
                  />
                  <Typography>yes</Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
          <Divider />
          <TableContainer sx={{maxHeight: 440}}>
            <Table
              stickyHeader
              sx={{
                '.MuiTableCell-sizeMedium': {
                  pt: '3px',
                  pr: '1px',
                  pb: '3px',
                  pl: '16px',
                },
                '.MuiTableCell-sizeSmall': {
                  pt: '3px',
                  pr: '1px',
                  pb: '3px',
                  pl: '1px',
                },
                tableLayout: 'fixed',
                width: 'auto',
                m: 'auto',
              }}>
              {rows.length == 1 ? (
                <TableHeader columns={columns} />
              ) : (
                <TableHeaderClickable
                  columns={columns}
                  timeChoiceId={timeChoiceId}
                  handleTimeChoiceSelect={handleTimeChoiceSelect}
                />
              )}
              <TableBodyCom rows={rows} columns={columns} />
            </Table>
          </TableContainer>
        </Card>
      </Container>
      {rows.length == 1 ? (
        <></>
      ) : (
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
            <Button
              variant="contained"
              sx={{
                m: '12px 12px 12px auto',
                p: '10px 20px 10px 20px',
                textTransform: 'none',
                fontWeight: 'bold',
                fontSize: 15,
              }}
              onClick={() => {}}>
              Book it
            </Button>
          </Toolbar>
        </AppBar>
      )}
    </>
  )
}

export default Meeting
