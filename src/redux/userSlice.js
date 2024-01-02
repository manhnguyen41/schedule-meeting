import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      user: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    getUserStart: state => {
      state.user.isFetching = true
    },
    getUserSuccess: (state, action) => {
      state.user.isFetching = false
      state.user.user = action.payload
      state.user.error = false
    },
    getUserFailed: state => {
      state.user.isFetching = false
      state.user.error = true
    },
    updateUserStart: state => {
      state.user.isFetching = true
    },
    updateUserSuccess: (state, action) => {
      state.user.isFetching = false
      state.user.user = {...state.user.user, userName: action.payload}
      state.user.error = false
    },
    updateUserFailed: state => {
      state.user.isFetching = false
      state.user.error = true
    },
    deleteUserStart: state => {
      state.user.isFetching = true
    },
    deleteUserSuccess: (state, action) => {
      state.user.isFetching = false
      state.user.error = false
    },
    deleteUserFailed: state => {
      state.user.isFetching = false
      state.user.error = true
    },
  },
})

export const {
  getUserStart,
  getUserSuccess,
  getUserFailed,
  updateUserFailed,
  updateUserStart,
  updateUserSuccess,
  deleteUserFailed,
  deleteUserStart,
  deleteUserSuccess
} = userSlice.actions

export default userSlice.reducer