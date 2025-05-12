import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../store/reducers/auth/authStatusSlice"
import loadingReducer from "../store/reducers/Loader/loadingStatus"
import userReducer from "../store/reducers/user/userSlice"
import imageReducer from "../store/reducers/image/imageSlice"
 const store = configureStore({
    reducer:{
        authReducer:authReducer,
        loadingReducer:loadingReducer,
        userReducer:userReducer,
        imageReducer:imageReducer
    }
})

export default store