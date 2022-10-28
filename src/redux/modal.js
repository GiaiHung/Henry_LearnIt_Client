import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
  id: ''
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true
      state.id = action.payload
    },
    closeModal: (state) => {
      state.isOpen = false
      state.id = ''
    },
  },
})

export const { openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer
