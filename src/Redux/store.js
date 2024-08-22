import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Auth/AuthSlice'


export default configureStore({
    reducer:{
        auth:authReducer,
    },
})