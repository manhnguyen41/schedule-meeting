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

function TableHeaderCellClickable(props) {
  const {column, timeChoiceId, handleTimeChoiceSelect} = props

  if (column.startTime.isBefore(dayjs())) {
    return (
      <TableCell
        key={column.id}
        align="center"
        sx={{width: '100px', minWidth: '100px', zIndex: 1, color: '#aeaeae'}}
        size="small">
        <Stack
          direction="column"
          spacing={0}
          sx={{mt: '8px', alignItems: 'center'}}>
          <StarOutlineIcon sx={{mt: 1, fontSize: 35, mb: 1}} />
          <Typography sx={{fontSize: 14, textTransform: 'uppercase'}}>
            {column.startTime.format('MMM')}
          </Typography>
          <Typography sx={{fontSize: 25, fontWeight: 'bold'}}>
            {column.startTime.format('D')}
          </Typography>
          <Typography sx={{fontSize: 14, textTransform: 'uppercase'}}>
            {column.startTime.format('ddd')}
          </Typography>
          <Typography
            sx={{fontSize: 14, mt: '16px'}}>{`${column.startTime.format(
            'h',
          )}:${column.startTime.format('mm')} ${column.startTime.format(
            'A',
          )}`}</Typography>
          <Typography sx={{fontSize: 14}}>{`${column.endTime.format(
            'h',
          )}:${column.endTime.format('mm')} ${column.endTime.format(
            'A',
          )}`}</Typography>
          <Stack
            direction="row"
            alignItems="center"
            alignSelf="center"
            spacing={0.5}>
            <PeopleIcon sx={{fontSize: 18}} />
            <Typography sx={{fontSize: 14}}>{column.numOfChoice}</Typography>
          </Stack>
        </Stack>
      </TableCell>
    )
  } else {
    return (
      <TableCell
        key={column.id}
        align="center"
        sx={{width: '100px', minWidth: '100px', zIndex: 1}}
        size="small">
        <Button
          id={column.id}
          onClick={handleTimeChoiceSelect}
          fullWidth
          sx={{
            backgroundColor: timeChoiceId == column.id ? '#fff8d4' : '#ffffff',
            color: '#000000',
          }}>
          <Stack
            id={column.id}
            direction="column"
            spacing={0}
            sx={{mt: '8px', alignItems: 'center'}}>
            {timeChoiceId == column.id ? (
              <StarIcon sx={{mt: 1, fontSize: 35, mb: 1, color: '#e0bb00'}} />
            ) : (
              <StarOutlineIcon
                sx={{mt: 1, fontSize: 35, mb: 1, color: '#e0bb00'}}
              />
            )}
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
            <Stack
              id={column.id}
              direction="row"
              alignItems="center"
              alignSelf="center"
              spacing={0.5}>
              <PeopleIcon id={column.id} sx={{fontSize: 18}} />
              <Typography id={column.id} sx={{fontSize: 14}}>
                {Math.round(column.numOfChoice)}
              </Typography>
            </Stack>
          </Stack>
        </Button>
      </TableCell>
    )
  }
}

export default TableHeaderCellClickable
