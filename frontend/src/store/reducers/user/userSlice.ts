import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {
    id: "",
    name: "",
    email: "",
    profileImageUrl: "",
    creaetAt: "",
  },
  userGallery:{
    
    publicImageCount:0,
    userPublicImages:[],
    privateImageCoutn:0,
    userPrivateImages:[],
    
  }
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserInformation: (state, action) => {
      state.userInfo = action.payload;
    },
    setUserGallery:(state,action)=>{
      state.userGallery = action.payload;
    }
  },
});

export const { setUserInformation,setUserGallery } = userSlice.actions;
export default userSlice.reducer;
