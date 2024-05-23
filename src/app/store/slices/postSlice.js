import { createSlice } from '@reduxjs/toolkit'
import { END_POINT } from '@/app/config';
import jwt, { decode } from 'jsonwebtoken'
import axios from 'axios';
export const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts: null,
        allPosts: null,
    },
    reducers: {
        pushMyPosts: (state, action) => {
            state.posts = action.payload;
        },
        pushAllPosts: (state, action) => {
          state.allPosts = action.payload;
      },
  }
})

export const { pushMyPosts, pushAllPosts } = postSlice.actions

export const getPosts = (login) => (dispatch) => {
  axios.get(`${END_POINT}/api/posts/${login}`)
  .then(res => {
    dispatch(pushMyPosts((res.data).reverse()))
  })
  .catch(err=>{
    if(err.response.data.message){
        alert(err.response.data.message)
    }
  })
}
export const likePost = (post) => (dispatch) => {
  axios.post(`${END_POINT}/api/post/like`, {postId: post.id})
  .then(res => {
    dispatch(getPosts(post.user.login))
    dispatch(getAllPosts(post.user.login))
  })
  .catch(err=>{
    if(err.response.data.message){
        alert(err.response.data.message)
    }
  })
}

export const dislikePost = (post) => (dispatch) => {
  axios.post(`${END_POINT}/api/post/dislike`, {postId: post.id})
  .then(res => {
    dispatch(getPosts(post.user.login))
    dispatch(getAllPosts(post.user.login))
  })
  .catch(err=>{
    if(err.response.data.message){
        alert(err.response.data.message)
    }
  })
}

export const savePost = (post) => (dispatch) => {
  axios.post(`${END_POINT}/api/post/save`, {postId: post.id})
  .then(res => {
    dispatch(getPosts(post.user.login))
    dispatch(getAllPosts(post.user.login))
  })
  .catch(err=>{
    if(err.response.data.message){
        alert(err.response.data.message)
    }
  })
}

export const unSavePost = (post) => (dispatch) => {
  axios.post(`${END_POINT}/api/post/unSave`, {postId: post.id})
  .then(res => {
    dispatch(getPosts(post.user.login))
    dispatch(getAllPosts(post.user.login))
  })
  .catch(err=>{
    if(err.response.data.message){
        alert(err.response.data.message)
    }
  })
}

export const getAllPosts = () => (dispatch) => {
  axios.get(`${END_POINT}/api/posts`)
  .then(res => {
  dispatch(pushAllPosts((res.data).reverse()))
  })
  .catch(err=>{
    if(err.response.data.message){
        alert(err.response.data.message)
    }
  })
}
export const newPost = (login, photo, caption, location) => (dispatch) => {
  let formData = new FormData();
  formData.append("photo", photo);
  formData.append("caption", caption);
  formData.append("location", location);
  axios.post(`${END_POINT}/api/post/createNew`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then(res => {
    dispatch(getPosts(login))
    dispatch(getAllPosts(login))
  }).catch(err=>{
    if(err.response.data.message){
        alert(err.response.data.message)
    }
  });
}

export const editPost = (login, id, caption, location) => (dispatch) => {
  axios.put(`${END_POINT}/api/post`, {id, caption, location})
  .then(res=>{
    dispatch(getPosts(login))
    dispatch(getAllPosts())
  })
  .catch(err=>{
    if(err.response.data.message){
        alert(err.response.data.message)
    }
  })
}

export const deletePost = (login, id) => (dispatch) => {
  axios.delete(`${END_POINT}/api/post/${id}`)
  .then(res=>{
    dispatch(getPosts(login))
    dispatch(getAllPosts())
  })
  .catch(err=>{
    if(err.response.data.message){
        alert(err.response.data.message)
    }
  })
}
export default postSlice.reducer