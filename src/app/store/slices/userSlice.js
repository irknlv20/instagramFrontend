import { createSlice } from '@reduxjs/toolkit'
import { END_POINT } from '@/app/config';
import axios from 'axios';
import { resolve } from 'styled-jsx/css';
import { useSelector } from 'react-redux';
import { getFollowers } from './followerSlice';
import { logIn } from './authSlice';
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        searchList: [],
        suggestions: [],
    },
    reducers: {
        push: (state, action) => {
            state.user = action.payload
        },
        clean: (state) => {
            state.user = null
        },
        pushList: (state, action) => {
            state.searchList = action.payload
        },
        pushSuggestions: (state, action) => {
            state.suggestions = action.payload
        }
  }
})

export const { push, clean, pushList, pushSuggestions } = userSlice.actions

export const getUser = (login) => (dispatch) => {
    axios.get(`${END_POINT}/api/user/${login}`)
    .then(res=>{
        dispatch(getFollowers(login));
        dispatch(push(res.data))
    })
    .catch(err=>{
        if(err.response.data.message){
            alert(err.response.data.message)
        }
    })
}

export const getUserList = (query) => (dispatch) => {
    axios.post(`${END_POINT}/api/user/search`, {query})
    .then(res=>{
        dispatch(pushList(res.data))
    })
    .catch(err=>{
        if(err.response?.data?.message){
            alert(err.response.data.message)
        }
    })
}

export const updateUserPhoto = (login, avatar) => (dispatch) => {
    let formData = new FormData();
    formData.append("avatar", avatar);
    axios.post(`${END_POINT}/api/user/updatePhoto`, formData, {
        headers: {
        'Content-Type': 'multipart/form-data'
        }
    })
    .then(res=>{
        dispatch(getUser(login))
    })
    .catch(err=>{
        if(err.response.data.message){
            alert(err.response.data.message)
        }
    })
}

export const editUser = (login, fullname, biography, gender) => (dispatch) => {
    axios.post(`${END_POINT}/api/user/edit`, {login, fullname, biography, gender})
    .then(res=>{
        dispatch(logIn(res.data));
        dispatch(getUser(login));
    })
    .catch(err=>{
        if(err.response.data.message){
            alert(err.response.data.message)
        }
    })
}

export const getSuggestions = () => (dispatch) => {
    axios.get(`${END_POINT}/api/user/suggestions`)
    .then(res=>{
        dispatch(pushSuggestions(res.data))
    })
    .catch(err=>{
        console.log(err)
    })
}
export default userSlice.reducer