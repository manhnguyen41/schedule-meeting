import {Card, CardActionArea, Typography} from '@mui/material'
import { useNavigate } from 'react-router-dom'


function SettingCard(props) {
  const {icon, title, subTitle, url} = props
  const navigate = useNavigate();
  return (
    <>
      <Card variant="outlined" sx={{height: '100%'}}>
        <CardActionArea sx={{p: '24px'}} onClick={() => navigate(url)}>
          <Typography sx={{textAlign: 'center'}}>{icon}</Typography>
          <Typography
            sx={{fontWeight: 'bold', textAlign: 'center', fontSize: 15}}>
            {title}
          </Typography>
          <Typography sx={{textAlign: 'center', fontSize: 14}}>
            {subTitle}
          </Typography>
        </CardActionArea>
      </Card>
    </>
  )
}

export default SettingCard
