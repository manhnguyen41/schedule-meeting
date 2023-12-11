import * as React from 'react'
import {Routes, Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import Login from './pages/Login/Login.jsx'
import { useSelector } from 'react-redux'

function App() {
  let user = useSelector(state => state.auth.login?.currentUser)
  console.log(user)
  return (
      <div>
        <Routes>
          <Route path="/">
            <Route index element={<Dashboard />} />
            <Route path='login' element={<Login />} />
            <Route path='dashboard' element={<Dashboard />} />
          </Route>
        </Routes>
      </div>
  )
}

export default App