import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allUsers:[],
  userInfo: {
    id: "",
    name: "",
    email: "",
    profileImageUrl: "",
    creaetAt: "",
    imageCount:0
  },
  userPublicImages:[],
  userPrivateImages:[]
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserInformation: (state, action) => {
      state.userInfo = action.payload;
    },
    setUserPublicImages:(state,action) => {
      state.userPublicImages = action.payload
    },
    setUserPrivateImages:(state,action) => {
      state.userPrivateImages = action.payload
    },
    setAllUsers:(state,action) =>{
      state.allUsers = action.payload
    }
  },
});

export const { setUserInformation,setUserPrivateImages,setUserPublicImages,setAllUsers} = userSlice.actions;
export default userSlice.reducer;
