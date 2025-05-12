import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {
    id: "",
    name: "",
    email: "",
    profileImageUrl: "",
    creaetAt: "",
  },
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserInformation: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setUserInformation } = userSlice.actions;
export default userSlice.reducer;
