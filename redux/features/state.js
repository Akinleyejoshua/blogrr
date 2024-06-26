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
    following: [],
    followers: [],
    img: "",
  },

  profile: {
    loading: true,
    _id: "",
    username: "",
    email: "",
    following: [],
    followers: [],
    img: "",
    bio: "",
    pwd: "",
  },

  posts: {
    loading: true,
    searching: false,
    items: [
      
    ],
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

    togglePostLoading: (state, action) => {
      state.posts.loading = action.payload;
    },

    clearProfileData: (state, action) => {
      state.profile = {
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
      };
    },

    clearUserData: (state, action) => {
      state.user = {
        loading: true,
        _id: "",
        username: "",
        email: "",
        following: 0,
        followers: 0,
        img: "",
      }
    },

    setUserData: (state, action) => {
      state.user = { ...action.payload };
    },

    setProfile: (state, action) => {
      state.profile = { ...action.payload };
    },

    setPostItems: (state, action) => {
      state.posts.items = action.payload;
    },

    setPostItem: (state, action) => {
      state.posts.items.push(action.payload);
    },

    setPostComment: (state, action) => {
      const data = action.payload
      const findPost = state.posts.items.find(item => item._id == data.main_post_id)
      findPost.comments = data;

    },
  },
});

export const {
  toggleSideBar,
  toggleUserLoading,
  toggleProfileLoading,
  togglePostLoading,
  clearProfileData,
  clearUserData,
  setUserData,
  setPostItem,
  setPostItems,
  setProfile,
  setPostComment,
} = promptSlice.actions;
export const stateReducer = promptSlice.reducer;
