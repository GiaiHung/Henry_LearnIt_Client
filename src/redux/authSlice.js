import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  authLoading: false,
  isAuthenticated: false,
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.authLoading = true
      state.user = action.payload.user
      state.authLoading = false
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.authLoading = true
      state.user = null
      state.isAuthenticated = false
      state.authLoading = false
    },
  },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
