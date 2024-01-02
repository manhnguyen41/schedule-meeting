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

export const getConfirmedMeetings = async (accessToken, dispatch, axiosJWT, userId) => {
  dispatch(getMeetingStart())
  try {
    const res = await axiosJWT.get(`${apiURL}/meeting/search/confirmedmeeting/${userId}`,{
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

export const createMeeting = async (
  accessToken,
  axiosJWT,
  navigate,
  meetingInfo,
) => {
  try {
    const res = await axiosJWT.post(`${apiURL}/meeting/create`, meetingInfo, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    navigate(`/meeting/organize/id/${res.data.dataMeeting.insertId}`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const updateMeeting = async (
  accessToken,
  axiosJWT,
  navigate,
  meetingInfo,
) => {
  try {
    const res = await axiosJWT.patch(`${apiURL}/meeting/update`, meetingInfo, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    navigate(`/meeting/organize/id/${meetingInfo.meetingId}`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const confirmMeeting = async (
  accessToken,
  axiosJWT,
  navigate,
  meetingInfo,
) => {
  try {
    const res = await axiosJWT.patch(`${apiURL}/meeting/update`, meetingInfo, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    navigate(`/dashBoard`)
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