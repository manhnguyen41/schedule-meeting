import {
  Stack,
  TableCell,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import TableHeaderCell from './TableHeaderCell'
import TableHeaderCellClickable from './TableHeaderCellClickable'

function TableHeaderClickable(props) {
  const {columns, timeChoiceId, handleTimeChoiceSelect} = props
  return (
    <TableHead>
      <TableRow>
        <TableCell
          key="participants"
          style={{
            width: '260px',
            minWidth: '260px',
            left: 0,
            background: 'white',
            borderRight: '1px solid grey',
            size: 'medium',
            position: 'sticky',
            zIndex: 2,
          }}>
          <Typography sx={{fontWeight: 'bold', fontSize: 15, mt: '205px'}}>
            Participants
          </Typography>
        </TableCell>
        {columns.map((column, index) => (
          <TableHeaderCellClickable
            column={column}
            timeChoiceId={timeChoiceId}
            handleTimeChoiceSelect={handleTimeChoiceSelect}
          />
        ))}
      </TableRow>
    </TableHead>
  )
}

export default TableHeaderClickable
