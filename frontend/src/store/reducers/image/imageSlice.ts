import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    publicImages:[]
}

const imageSlice = createSlice({
    name: "imageSlice",
    initialState,
    reducers:{
        setPublicImages:(state,action)=>{
            state.publicImages = action.payload
        }
    }
})

export const {setPublicImages} = imageSlice.actions;
export default imageSlice.reducer