import {createSlice} from '@reduxjs/toolkit'

const meetingSlice = createSlice({
  name: 'meeting',
  initialState: {
    meeting: {
      meetings: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    getMeetingStart: state => {
      state.meeting.isFetching = true
    },
    getMeetingSuccess: (state, action) => {
      state.meeting.isFetching = false
      state.meeting.meetings = action.payload
      state.meeting.error = false
    },
    getMeetingFailed: state => {
      state.meeting.isFetching = false
      state.meeting.error = true
    },
  },
})

export const {
  getMeetingFailed,
  getMeetingStart,
  getMeetingSuccess,
} = meetingSlice.actions

export default meetingSlice.reducer