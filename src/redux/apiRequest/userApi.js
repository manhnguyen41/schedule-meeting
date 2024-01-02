import axios from 'axios'
import {apiURL} from '../../globalVar'
import {
  getUserStart,
  getUserSuccess,
  getUserFailed,
  updateUserStart,
  updateUserSuccess,
  updateUserFailed,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailed,
} from '../userSlice'
import { loginFailed } from '../authSlice'

export const getUser = async (accessToken, dispatch, navigate, axiosJWT, userId) => {
  dispatch(getUserStart())
  try {
    const res = await axiosJWT.get(`${apiURL}/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    if (res.data.success == 0) {
      dispatch(loginFailed())
      navigate('/login')
    }
    dispatch(getUserSuccess(res.data))
    return res.data.data
  } catch (error) {
    dispatch(getUserFailed())
    dispatch(loginFailed())
    navigate('/login')
    console.log(error)
  }
}

export const getOtherUser = async (accessToken, axiosJWT, userId) => {
  try {
    const res = await axiosJWT.get(`${apiURL}/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return res.data.data
  } catch (error) {
    console.log(error)
  }
}

export const updateUser = async (
  accessToken,
  dispatch,
  axiosJWT,
  userId,
  username,
) => {
  dispatch(updateUserStart())
  const body = {
    username: username,
    userId: userId,
  }
  try {
    const res = await axiosJWT.patch(`${apiURL}/user/update`, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    dispatch(updateUserSuccess(username))
    return username
  } catch (error) {
    dispatch(updateUserFailed())
    console.log(error)
  }
}

export const deleteUser = async (accessToken, dispatch, axiosJWT, userId) => {
  dispatch(deleteUserStart())
  const body = {
    userId: userId,
  }
  try {
    const res = await axiosJWT.patch(`${apiURL}/user/delete`, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    dispatch(deleteUserSuccess(res.data))
    return res.data.data
  } catch (error) {
    dispatch(deleteUserFailed())
    console.log(error)
  }
}
