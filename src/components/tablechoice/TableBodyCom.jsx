import {Stack, TableBody, TableCell, TableRow, Typography} from '@mui/material'
import DoneIcon from '@mui/icons-material/Done'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import dayjs from 'dayjs'
import ClearIcon from '@mui/icons-material/Clear'

function TableBodyCom(props) {
  const {rows, columns} = props
  return (
    <TableBody>
      {rows.map((row, index) => {
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
                borderRight: '1px solid grey',
                size: 'medium',
                position: 'sticky',
                scope: 'row',
              }}>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{mt: 1, mb: 1}}>
                <AccountCircleRoundedIcon sx={{color: '#acaeaf'}} />
                <Stack direction="column" spacing={0}>
                  <Typography sx={{fontSize: 13}}>{row.name}</Typography>
                  <Typography sx={{fontSize: 11, color: '#acaeaf'}}>
                    You
                  </Typography>
                </Stack>
              </Stack>
            </TableCell>
            {columns.map(column => {
              const value = row.choice[column.id]
              return (
                <TableCell
                  key={column.id}
                  align="center"
                  sx={{width: '100px', minWidth: '100px'}}
                  size="small">
                  {value === 'yes' ? (
                    <Typography
                      sx={{
                        backgroundColor: column.startTime.isBefore(dayjs()) ? '#f8f8f9' : '#e7f8ed',
                        width: '92px',
                        height: '48px',
                        mt: '4px',
                        mr: '5px',
                        mb: '4px',
                        ml: '5px',
                      }}>
                      <DoneIcon
                        sx={{
                          color: column.startTime.isBefore(dayjs()) ? '#aeaeae' : '#0d8834',
                          backgroundColor: column.startTime.isBefore(dayjs()) ? '#f8f8f9' : '#e7f8ed',
                          mt: '10px',
                        }}
                      />
                    </Typography>
                  ) : (
                    <></>
                  )}
                  {value === 'if need be' ? (
                    <Typography
                      sx={{
                        backgroundColor: column.startTime.isBefore(dayjs()) ? '#f8f8f9' : '#fff1a8',
                        width: '92px',
                        height: '48px',
                        mt: '4px',
                        mr: '5px',
                        mb: '4px',
                        ml: '5px',
                      }}>
                      <DoneIcon
                        sx={{
                          color: column.startTime.isBefore(dayjs()) ? '#aeaeae' : '#cd9949',
                          backgroundColor: column.startTime.isBefore(dayjs()) ? '#f8f8f9' : '#fff1a8',
                          mt: '10px',
                        }}
                      />
                    </Typography>
                  ) : (
                    <></>
                  )}
                  {value === 'cannot attend' ? (
                    <Typography
                      sx={{
                        backgroundColor: column.startTime.isBefore(dayjs()) ? '#f8f8f9' : '#eeeeef',
                        width: '92px',
                        height: '48px',
                        mt: '4px',
                        mr: '5px',
                        mb: '4px',
                        ml: '5px',
                      }}>
                      <ClearIcon
                        sx={{
                          color: '#aeaeae',
                          backgroundColor: column.startTime.isBefore(dayjs()) ? '#f8f8f9' : '#eeeeef',
                          mt: '10px',
                        }}
                      />
                    </Typography>
                  ) : (
                    <></>
                  )}
                </TableCell>
              )
            })}
          </TableRow>
        )
      })}
    </TableBody>
  )
}

export default TableBodyCom
