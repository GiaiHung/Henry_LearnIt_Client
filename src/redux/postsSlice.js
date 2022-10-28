import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  postsLoading: false,
  posts: [],
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    savePosts: (state, action) => {
      state.postsLoading = true
      state.posts = [...action.payload]
      state.postsLoading = false
    },
    updatePost: (state, action) => {
      const newPosts = [...state.posts].map((post) =>
        post._id === action.payload.id ? action.payload.post : post
      )
      state.postsLoading = true
      state.posts = newPosts
      state.postsLoading = false
    },
  },
})

export const { savePosts } = postsSlice.actions

export default postsSlice.reducer
