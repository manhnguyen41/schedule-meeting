import {
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import TableHeaderCell from './TableHeaderCell'

function TableHeader(props) {
  const {columns} = props
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
          <Typography sx={{fontWeight: 'bold', fontSize: 15, mt: '142px'}}>
            Participants
          </Typography>
        </TableCell>
        {columns?.map((column, index) => (
          <TableHeaderCell column={column} />
        ))}
      </TableRow>
    </TableHead>
  )
}

export default TableHeader
