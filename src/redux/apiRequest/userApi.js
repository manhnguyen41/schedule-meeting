import axios from 'axios'
import { apiURL } from '../../globalVar'
import {
    getUserStart,
    getUserSuccess,
    getUserFailed,
  } from '../userSlice'
  
  export const getUser = async (accessToken, dispatch, axiosJWT, userId) => {
    dispatch(getUserStart())
    try {
      const res = await axiosJWT.get(`${apiURL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      dispatch(getUserSuccess(res.data))
      return res.data.data
    } catch (error) {
      dispatch(getUserFailed())
      console.log(error)
    }
  }