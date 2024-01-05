import {apiURL} from '../../globalVar'

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