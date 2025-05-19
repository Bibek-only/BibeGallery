import { createSlice } from "@reduxjs/toolkit";


interface ImageState {
  publicImages: any;
  specificPersonData: any;
  searchQuery: string;
  tagQuery: string[];
  isUploadFormOpen:boolean;
}

const initialState: ImageState = {
  publicImages: [],
  specificPersonData:{
    name:"",
    profileImageUrl:"",
    images:[],
  },
  searchQuery: "",
  tagQuery: [],
  isUploadFormOpen:false
};

const imageSlice = createSlice({
  name: "imageSlice",
  initialState,
  reducers: {
    setIsuploadFormOpen: (state,action)=>{
      state.isUploadFormOpen =  action.payload
    },
    setPublicImages: (state, action) => {
      state.publicImages = action.payload;
    },
    setSpecificPersonData:(state,action)=>{
      state.specificPersonData = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setTagQuery: (state, action) => {
      state.tagQuery = action.payload;
    },
    addTagToQuery: (state, action) => {
      const tag = action.payload;
      if (!state.tagQuery.includes(tag)) {
        state.tagQuery.push(tag);
      }
    },
    removeTagFromQuery: (state, action) => {
      const tag = action.payload;
      state.tagQuery = state.tagQuery.filter((t) => t !== tag);
    },
    toggleTagInQuery: (state, action) => {
      const tag = action.payload;
      if (state.tagQuery.includes(tag)) {
        state.tagQuery = state.tagQuery.filter((t) => t !== tag);
      } else {
        state.tagQuery.push(tag);
      }
    },
  },
});

export const {
  setPublicImages,
  setSearchQuery,
  setTagQuery,
  addTagToQuery,
  removeTagFromQuery,
  toggleTagInQuery,
  setSpecificPersonData,
  setIsuploadFormOpen
} = imageSlice.actions;

export default imageSlice.reducer;
