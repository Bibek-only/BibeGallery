import { createSlice } from "@reduxjs/toolkit";

interface ImageState {
  publicImages: string[];
  searchQuery: string;
  tagQuery: string[];
}

const initialState: ImageState = {
  publicImages: [],
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
} = imageSlice.actions;

export default imageSlice.reducer;
