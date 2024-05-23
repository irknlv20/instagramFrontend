import { createSlice } from '@reduxjs/toolkit'
import { END_POINT } from '@/app/config';
import axios from 'axios';
import { useSelector } from 'react-redux';
import jwt, { decode } from 'jsonwebtoken'
export const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        comments: null,
        commentsLikes: null,
    },
    reducers: {
        pushComments: (state, action) => {
            state.comments = action.payload;
        },
        clear: (state) => {
            state.comments = null;
        }
  }
})

export const { pushComments, clear } = commentSlice.actions

export const getComments = (id) => (dispatch) => {
  const token = JSON.parse(localStorage.getItem('token'));
  const decoded = jwt.decode(token);
  const currentUser = decoded.id;
  axios.get(`${END_POINT}/api/comment/post/${id}`)
    .then(res => {
      let comRes = res.data.map((i) => {
        if (i.user.photoUrl) {
          i.user.photoUrl = i.user.photoUrl.replace('/media', '');
        }
        return i;
      });

      const promises = comRes.map((i) => {
        return axios.get(`${END_POINT}/api/comment/likes/${i.id}`)
          .then(comLikeRes => {
            i.likes = comLikeRes.data;
            i.isLikedByMe = i.likes.some(like => like.userId === currentUser);
          });
      });

      Promise.all(promises).then(() => {
        dispatch(pushComments(comRes));
      });
    })
    .catch(err=>{
      if(err.response.data.message){
          alert(err.response.data.message)
        }
    })
}

export const addComment = (content, postId, refCom) => (dispatch) => {
  axios.post(`${END_POINT}/api/comment`, {content, postId, refComId: refCom})
  .then(res => {
    dispatch(getComments(postId))
  })
  .catch(err=>{
    if(err.response.data.message){
        alert(err.response.data.message)
    }
  })
}

export const deleteComment = (comId, postId) => (dispatch) => {
  axios.delete(`${END_POINT}/api/comment/${comId}`)
  .then(res => {
    dispatch(getComments(postId))
  })
  .catch(err=>{
    if(err.response.data.message){
        alert(err.response.data.message)
    }
  })
}

export const likeComment = (commentId, postId) => (dispatch) => {
  axios.post(`${END_POINT}/api/comment/like`, {commentId})
  .then(res => {
    dispatch(getComments(postId))
  })
  .catch(err=>{
    if(err.response.data.message){
        alert(err.response.data.message)
    }
  })
}

export const dislikeComment = (commentId, postId) => (dispatch) => {
  axios.post(`${END_POINT}/api/comment/dislike`, {commentId})
  .then(res => {
    dispatch(getComments(postId))
  })
  .catch(err=>{
    if(err.response.data.message){
        alert(err.response.data.message)
    }
  })
}

export default commentSlice.reducer