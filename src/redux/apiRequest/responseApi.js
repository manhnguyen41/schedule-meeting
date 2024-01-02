import axios from 'axios'
import {apiURL} from '../../globalVar'
import {
  getMeetingFailed,
  getMeetingStart,
  getMeetingSuccess,
} from '../meetingSlice'

export const getMeetings = async (accessToken, dispatch, axiosJWT) => {
  try {
    const res = await axiosJWT.get(`${apiURL}/meeting/`,{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return res.data.data
  } catch (error) {
    console.log(error)
  }
}

export const getAllMeetings = async (accessToken, dispatch, axiosJWT, userId) => {
  dispatch(getMeetingStart())
  try {
    const res = await axiosJWT.get(`${apiURL}/meeting/search/user/${userId}`,{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    dispatch(getMeetingSuccess(res.data))
    return res.data.data
  } catch (error) {
    dispatch(getMeetingFailed())
    console.log(error)
  }
}

export const getSentMeetings = async (accessToken, dispatch, axiosJWT, userId) => {
  dispatch(getMeetingStart())
  try {
    const res = await axiosJWT.get(`${apiURL}/meeting/search/organizer/${userId}`,{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    dispatch(getMeetingSuccess(res.data))
    return res.data.data
  } catch (error) {
    dispatch(getMeetingFailed())
    console.log(error)
  }
}

export const getReceivedMeetings = async (accessToken, dispatch, axiosJWT, userId) => {
  dispatch(getMeetingStart())
  try {
    const res = await axiosJWT.get(`${apiURL}/meeting/search/participant/${userId}`,{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    dispatch(getMeetingSuccess(res.data))
    return res.data.data
  } catch (error) {
    dispatch(getMeetingFailed())
    console.log(error)
  }
}

export const getResponseByMeetingId = async (accessToken, axiosJWT, meetingId) => {
  try {
    const res = await axiosJWT.get(`${apiURL}/response/search/meeting/${meetingId}`,{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return res.data.data
  } catch (error) {
    console.log(error)
  }
}

export const createResponse = async (
  accessToken,
  axiosJWT,
  navigate,
  responseInfo,
) => {
  try {
    const res = await axiosJWT.post(`${apiURL}/response/create`, responseInfo, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    navigate(`/dashboard`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const updateResponse = async (
  accessToken,
  axiosJWT,
  navigate,
  responseInfo,
) => {
  try {
    const res = await axiosJWT.patch(`${apiURL}/response/update`, responseInfo, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    navigate(`/dashboard`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const deleteMeeting = async (
  accessToken,
  axiosJWT,
  meetingId
) => {
  const body = {
    meetingId: meetingId
  }
  try {
    const res = await axiosJWT.patch(`${apiURL}/meeting/delete`, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}