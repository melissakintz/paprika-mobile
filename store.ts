import { configureStore } from '@reduxjs/toolkit'
import login from './Redux/login'
import user from './Redux/user'

export default configureStore({
  reducer: {
      logged: login,
      userlogged: user
  }
})