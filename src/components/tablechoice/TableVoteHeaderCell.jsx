import {
  Button,
  Container,
  Stack,
  TableCell,
  ToggleButton,
  Typography,
} from '@mui/material'
import PeopleIcon from '@mui/icons-material/People'
import dayjs from 'dayjs'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import StarIcon from '@mui/icons-material/Star'
import DoneIcon from '@mui/icons-material/Done'

const options = {
  Yes: {
    color: '#e8fcec',
    icon: (
      <DoneIcon
        sx={{
          color: '#88c924',
          mt: '20px',
          mb: '12px',
          backgroundColor: '#ffffff',
          borderColor: '#000000',
          border: '10px',
        }}
      />
    ),
  },
  'If need be': {
    color: '#fff1a8',
    icon: (
      <DoneIcon
        sx={{
          color: '#906e1f',
          mt: '20px',
          mb: '12px',
          backgroundColor: '#ffffff',
          borderColor: '#000000',
        }}
      />
    ),
  },
  No: {
    color: '#ffffff',
    icon: (
      <DoneIcon
        sx={{
          color: '#ffffff',
          mt: '20px',
          mb: '12px',
          backgroundColor: '#ffffff',
          borderColor: '#000000',
        }}
      />
    ),
  },
}

function TableVoteHeaderCell(props) {
  const {column, choice, handleChoiceChange} = props

  if (column.startTime.isBefore(dayjs())) {
    return (
      <TableCell
        key={column.id}
        align="center"
        sx={{
          width: '100px',
          minWidth: '100px',
          zIndex: 1,
          borderBottom: 'none',
          color: '#aeaeae',
        }}
        size="small">
        <Button
          id={column.id}
          onClick={handleChoiceChange}
          fullWidth
          sx={{
            backgroundColor: options[choice[column.id]]?.color,
            color: '#000000',
          }}>
          <Stack
            id={column.id}
            direction="column"
            spacing={0}
            sx={{mt: '8px', alignItems: 'center'}}>
            <Typography
              id={column.id}
              sx={{fontSize: 14, textTransform: 'uppercase'}}>
              {column.startTime.format('MMM')}
            </Typography>
            <Typography id={column.id} sx={{fontSize: 25, fontWeight: 'bold'}}>
              {column.startTime.format('D')}
            </Typography>
            <Typography
              id={column.id}
              sx={{fontSize: 14, textTransform: 'uppercase'}}>
              {column.startTime.format('ddd')}
            </Typography>
            <Typography
              id={column.id}
              sx={{fontSize: 14, mt: '16px'}}>{`${column.startTime.format(
              'h',
            )}:${column.startTime.format('mm')} ${column.startTime.format(
              'A',
            )}`}</Typography>
            <Typography
              id={column.id}
              sx={{fontSize: 14}}>{`${column.endTime.format(
              'h',
            )}:${column.endTime.format('mm')} ${column.endTime.format(
              'A',
            )}`}</Typography>
            {options[choice[column.id]]?.icon}
          </Stack>
        </Button>
      </TableCell>
    )
  } else {
    return (
      <TableCell
        key={column.id}
        align="center"
        sx={{
          width: '100px',
          minWidth: '100px',
          zIndex: 1,
          borderBottom: 'none',
        }}
        size="small">
        <Button
          id={column.id}
          onClick={handleChoiceChange}
          fullWidth
          sx={{
            backgroundColor: options[choice[column.id]]?.color,
            color: '#000000',
          }}>
          <Stack
            id={column.id}
            direction="column"
            spacing={0}
            sx={{mt: '8px', alignItems: 'center'}}>
            <Typography
              id={column.id}
              sx={{fontSize: 14, textTransform: 'uppercase'}}>
              {column.startTime.format('MMM')}
            </Typography>
            <Typography id={column.id} sx={{fontSize: 25, fontWeight: 'bold'}}>
              {column.startTime.format('D')}
            </Typography>
            <Typography
              id={column.id}
              sx={{fontSize: 14, textTransform: 'uppercase'}}>
              {column.startTime.format('ddd')}
            </Typography>
            <Typography
              id={column.id}
              sx={{fontSize: 14, mt: '16px'}}>{`${column.startTime.format(
              'h',
            )}:${column.startTime.format('mm')} ${column.startTime.format(
              'A',
            )}`}</Typography>
            <Typography
              id={column.id}
              sx={{fontSize: 14}}>{`${column.endTime.format(
              'h',
            )}:${column.endTime.format('mm')} ${column.endTime.format(
              'A',
            )}`}</Typography>
            {options[choice[column.id]]?.icon}
          </Stack>
        </Button>
      </TableCell>
    )
  }
}

export default TableVoteHeaderCell
