import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogedIn: false,
    isAdmin: false,
}

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers:{
        setUserAuthStatus:(state,action)=>{
            state.isLogedIn = action.payload
        },

        setAdminAuthStatus:(state,action)=>{
            state.isAdmin = action.payload
        }
    }
})

export const {setUserAuthStatus,setAdminAuthStatus} = authSlice.actions
export default authSlice.reducer