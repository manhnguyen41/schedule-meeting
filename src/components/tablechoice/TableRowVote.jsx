import {Stack, TableCell, TableRow, Typography} from '@mui/material'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import ClearIcon from '@mui/icons-material/Clear'
import DoneIcon from '@mui/icons-material/Done'
import dayjs from 'dayjs'

const options = {
  yes: {
    color: '#e7f8ed',
    icon: (
      <DoneIcon
        sx={{
          color: '#03812d',
          mt: '20px',
          mb: '12px',
          backgroundColor: '#e7f8ed',
          borderColor: '#e7f8ed',
        }}
      />
    ),
  },
  'if need be': {
    color: '#fff1a8',
    icon: (
      <DoneIcon
        sx={{
          color: '#c89646',
          mt: '20px',
          mb: '12px',
          backgroundColor: '#fff1a8',
          borderColor: '#000000',
        }}
      />
    ),
  },
  no: {
    color: '#f8f8f9',
    icon: (
      <ClearIcon
        sx={{
          color: '#aeaeae',
          mt: '20px',
          mb: '12px',
          backgroundColor: '#f8f8f9',
          borderColor: '#000000',
        }}
      />
    ),
  },
}

function TableRowVote(props) {
  const {row, index, columns} = props
  return (
    <TableRow key={index}>
      <TableCell
        key="name"
        align="left"
        sx={{
          width: '260px',
          minWidth: '260px',
          left: 0,
          background: 'white',
          size: 'medium',
          position: 'sticky',
          scope: 'row',
        }}>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{mt: 1, mb: 1}}>
          <AccountCircleRoundedIcon sx={{fontSize: 40}} />
          <Stack direction="column" spacing={0}>
            <Typography sx={{fontSize: 17, fontWeight: 'bold'}}>
              {row?.name}
            </Typography>
            {row?.isOrganizer ? (
              <Typography sx={{fontSize: 13}}>Organizer</Typography>
            ) : (
              <></>
            )}
          </Stack>
        </Stack>
      </TableCell>
      {columns.map(column => (
        <TableCell
          key={column.id}
          align="center"
          sx={{
            width: '100px',
            minWidth: '100px',
          }}
          size="small">
          <Typography
            sx={{
              backgroundColor: column.startTime.isBefore(dayjs())
                ? '#f8f8f9'
                : options[row?.choice[column.id]]?.color,
              width: '92px',
              height: '48px',
              mt: '4px',
              mr: '5px',
              mb: '4px',
              ml: '5px',
            }}>
            {options[row?.choice[column.id]]?.icon}
          </Typography>
        </TableCell>
      ))}
    </TableRow>
  )
}

export default TableRowVote
