import axios from 'axios'
import jwt_decode from 'jwt-decode'
import {
  loginSuccess,
  loginFailed
} from './redux/authSlice'
import {store} from './redux/store'

export const createAxios = (user, dispatch, navigate) => {
  const newInstance = axios.create()
  newInstance.interceptors.request.use(
    async config => {
      let date = new Date()
      const decodedToken = jwt_decode(user?.token)
      if (decodedToken.exp < date.getTime() / 1000) {
        dispatch(loginFailed())
        navigate("/login")
      }
      return config
    },
    err => {
      return Promise.reject(err)
    },
  )
  return newInstance
}
