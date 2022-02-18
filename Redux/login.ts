import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    value: false
  },
  reducers: {
    loggedIn: state => {
      state.value = true
    },
    loggedOut: state => {
      state.value = false
    },
  }
})

export const { loggedIn, loggedOut } = loginSlice.actions

export default loginSlice.reducer