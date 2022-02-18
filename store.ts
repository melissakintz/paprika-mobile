import { configureStore } from '@reduxjs/toolkit'
import login from './Redux/login'

export default configureStore({
  reducer: {
      logged: login
  }
})