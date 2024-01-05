import axios from 'axios'
import {
    loginFailed,
    loginStart,
    loginSuccess,
    logOutStart,
    logOutSuccess,
    logOutFailed,
} from '../authSlice'
import { apiURL } from '../../globalVar'

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart())
    try {
        const res
            = await axios.post(`${apiURL}/user/login`, user)
        dispatch(loginSuccess(res.data))
        navigate('/dashboard')
    } catch (error) {
        dispatch(loginFailed())
        console.log(error);
        alert(error)
    }
}

export const logOut = (
    dispatch,
    navigate,
) => {
    dispatch(logOutStart())
    try {
        dispatch(logOutSuccess())
        navigate('/login')
    } catch (error) {
        dispatch(logOutFailed())
    }
}