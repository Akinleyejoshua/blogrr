import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  components: {
    sidebar: false,
  },

  user: {
    loading: true,
    _id: "",
    username: "",
    email: "",
    following: 0,
    followers: 0,
    img: "",
  },

  profile: {
    loading: true,
    _id: "",
    username: "",
    email: "",
    following: 0,
    followers: 0,
    img: "",
    _following: [],
    _followers: [],
    bio: "",
    pwd: "",
  },

  posts: {
    loading: true,
    items: [],
    searchItems: [],
  },
};

export const promptSlice = createSlice({
  name: "prompt",
  initialState,
  reducers: {
    toggleSideBar: (state, action) => {
      state.components.sidebar = action.payload;
    },

    toggleUserLoading: (state, action) => {
      state.user.loading = action.payload;
    },

    toggleProfileLoading: (state, action) => {
      state.profile.loading = action.payload;
    },

    setUserData: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },

    setProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload }
    },

    setPostItems: (state, action) => {
      state.posts.items = action.payload;
    },

    setPostItem: (state, action) => {
      state.posts.items.push(action.payload);
    },
  },
});

export const {
  toggleSideBar,
  toggleUserLoading,
  toggleProfileLoading,
  setUserData,
  setPostItem,
  setPostItems,
  setProfile,
} = promptSlice.actions;
export const stateReducer = promptSlice.reducer;
