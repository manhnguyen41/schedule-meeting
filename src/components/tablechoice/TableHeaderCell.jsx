import {Container, Stack, TableCell, Typography} from '@mui/material'
import PeopleIcon from '@mui/icons-material/People'
import dayjs from 'dayjs'

function TableHeaderCell(props) {
  const {column} = props

  if (column.startTime.isBefore(dayjs())) {
    return (
      <TableCell
        key={column.id}
        align="center"
        sx={{width: '100px', minWidth: '100px', zIndex: 1, color: '#aeaeae'}}
        size="small">
        <Stack direction="column" spacing={0} sx={{mt: '8px'}}>
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
        <Stack direction="column" spacing={0} sx={{mt: '8px'}}>
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
  }
}

export default TableHeaderCell
