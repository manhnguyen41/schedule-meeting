import HomeIcon from '@mui/icons-material/Home'
import React, { Component }  from 'react';
import NavBar from '../components/NavBar.jsx'
import { pages } from '../Var.js';

function Dashboard() {
    return (
        <>
      <NavBar pages={pages} value={0} />
      {/* <PageHeader
        title="Home"
        subTitle="Home page"
        icon={<HomeIcon fontSize="medium" />}
      /> */}
    </>
    )
}

export default Dashboard