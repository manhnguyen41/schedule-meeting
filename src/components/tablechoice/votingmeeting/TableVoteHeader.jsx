import {
  Stack,
  TableCell,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import TableVoteHeaderCell from './TableVoteHeaderCell'

function TableVoteHeader(props) {
  const {orderBy, handleOrderSelect, columns, choice, handleChoiceChange} =
    props
  return (
    <TableHead>
      <TableRow>
        <TableCell
          key="order"
          style={{
            width: '260px',
            minWidth: '260px',
            left: 0,
            background: 'white',
            size: 'medium',
            position: 'sticky',
            zIndex: 2,
            borderBottom: 'none'
          }}>
          <Typography sx={{fontSize: 17, mt: '14px'}}>Order by</Typography>
          <ToggleButtonGroup
            value={orderBy}
            exclusive
            onChange={handleOrderSelect}
            sx={{mb: '86px'}}>
            <ToggleButton
              value="Date"
              sx={{
                pl: '8px',
                pr: '8px',
                pt: '4px',
                pb: '4px',
                fontSize: 13,
                borderWidth: '2px',
                textTransform: 'none',
              }}>
              Date
            </ToggleButton>
            <ToggleButton
              value="Most popular"
              sx={{
                pl: '8px',
                pr: '8px',
                pt: '4px',
                pb: '4px',
                fontSize: 13,
                borderWidth: '2px',
                textTransform: 'none',
              }}>
              Most popular
            </ToggleButton>
          </ToggleButtonGroup>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{mt: 1, mb: 1}}>
            <AccountCircleRoundedIcon sx={{fontSize: 40}} />
            <Typography sx={{fontSize: 17}}>You</Typography>
          </Stack>
        </TableCell>
        {columns.map((column, index) => (
          <TableVoteHeaderCell
            column={column}
            choice={choice}
            handleChoiceChange={handleChoiceChange}
          />
        ))}
      </TableRow>
    </TableHead>
  )
}

export default TableVoteHeader
