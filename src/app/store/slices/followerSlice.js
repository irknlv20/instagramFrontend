import { createSlice } from '@reduxjs/toolkit'
import { END_POINT } from '@/app/config';
import axios from 'axios';
export const followerSlice = createSlice({
    name: 'follower',
    initialState: {
        followers: null,
        profiles: null,
        isFollowing: null,
    },
    reducers: {
        pushFollowers: (state, action) => {
            state.followers = action.payload;
        },
        pushProfiles: (state, action) => {
            state.profiles = action.payload;
        },
        pushFollowing: (state, action) => {
            state.isFollowing = action.payload;
        }
  }
})

export const { pushFollowers, pushProfiles, pushFollowing } = followerSlice.actions

export const getFollowers = (login) => (dispatch) => {
    axios.get(`${END_POINT}/api/followers/${login}`)
    .then(res=>{
        dispatch(pushFollowers(res.data));
    })
    .catch(err=>{
        if(err.response.data.message){
            alert(err.response.data.message)
        }
    })
}
export const setFollowing = (value) => (dispatch) => {
    dispatch(pushFollowing(value))
}
export const subscribeTo = (login, profileId) => (dispatch) => {
    axios.post(`${END_POINT}/api/subscribe`, {profileId})
    .then(res=>{
        dispatch(getFollowers(login));
    })
    .catch(err=>{
        if(err.response.data.message){
            alert(err.response.data.message)
        }
    })
}

export const unSubscribeTo = (login, profileId) => (dispatch) => {
    axios.delete(`${END_POINT}/api/subscribe`, { data: { profileId: profileId } })
    .then(res => {
        dispatch(getProfiles(login));
        dispatch(getFollowers(login));

    })
    .catch(err=>{
        if(err.response.data.message){
            alert(err.response.data.message)
        }
    })
};

export const getProfiles = (login) => (dispatch) => {
    axios.get(`${END_POINT}/api/profiles/${login}`)
    .then(res=>{
        dispatch(pushProfiles(res.data));
    })
    .catch(err=>{
        if(err.response.data.message){
            alert(err.response.data.message)
        }
    })
}

export default followerSlice.reducer