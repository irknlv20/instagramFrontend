import { createSlice } from '@reduxjs/toolkit'
import { END_POINT } from '@/app/config';
import axios from 'axios';
import jwt, { decode } from 'jsonwebtoken'
export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
        currentUser: null,
        tokenExt: 0,
    },
    reducers: {
        logIn: (state, action) => {
            localStorage.setItem('token', JSON.stringify(action.payload.token));
            axios.defaults.headers.common['Authorization'] = `Bearer ${action.payload.token}`
            const decoded = jwt.decode(action.payload.token);
            state.currentUser = {
                id: decoded.id,
                email: decoded.email,
                fullname: decoded.fullname,
                login: decoded.login,
                role: decoded.role,
                photoUrl: decoded.photoUrl,
                gender: decoded.gender,
                biography: decoded.biography,
            }
            state.isAuth = true;
            state.tokenExt = decoded.ext;
        },
        logOut: (state) => {
            state.isAuth = false;
        },
  }
})

export const { logIn, logOut } = authSlice.actions

export const sendLogin = (loginText, password) => (dispatch) => {
    axios.post(`${END_POINT}/api/login`, {
        loginText,
        password,
    }).then(res=>{
        console.log(res.data)
        dispatch(logIn(res.data))
    }).catch(err=>{
        if(err.response.data.message){
            alert(err.response.data.message)
        }
    })
}

export const sendRegistration = (email, login, password, fullname) => (dispatch) => {
    axios.post(`${END_POINT}/api/register`, {
        email,
        login,
        password,
        fullname,
    })
}
export default authSlice.reducer