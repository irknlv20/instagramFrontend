import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import followerSlice from './slices/followerSlice'
import userSlice from './slices/userSlice'
import postSlice from './slices/postSlice'
import commentSlice from './slices/commentSlice'

export default configureStore({
  reducer: {
    auth: authSlice,
    follower: followerSlice,
    user: userSlice,
    post: postSlice,
    comment: commentSlice,
  }
})