import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../store/reducers/auth/authStatusSlice"
 const store = configureStore({
    reducer:{
        authReducer:authReducer
    }
})

export default store