import { createSlice } from "@reduxjs/toolkit";

interface ImageState {
  publicImages: any;
  specificPersonData: any;
  searchQuery: string;
  tagQuery: string[];
}

const initialState: ImageState = {
  publicImages: [
    {
      id: 9,
      imageUrl:
        "https://ik.imagekit.io/Bibekabcsik09/bibe-gallery/hotel_C8bTMvrymq.jpg",
      tags: ["tag"],
      userId: 12,
      user: {
        name: "Bibek samal",
      },
    },
  ],
  specificPersonData:{
    name:"",
    profileImageUrl:"",
    images:[
      {
        id: 0,
        imageUrl: "",
        tags: ["tag"],
        userId: 0,
        user: {
          name: "",
        },
      },
    ],
  },
  searchQuery: "",
  tagQuery: [],
};

const imageSlice = createSlice({
  name: "imageSlice",
  initialState,
  reducers: {
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
  setSpecificPersonData
} = imageSlice.actions;

export default imageSlice.reducer;
