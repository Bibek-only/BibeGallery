import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading:false
}

const loadingSlice = createSlice({
    name: "loadingSlice",
    initialState,
    reducers:{
        setLoadingState:(state,action)=>{
            state.isLoading = action.payload
        }
    }
})

export const {setLoadingState} = loadingSlice.actions;
export default loadingSlice.reducer