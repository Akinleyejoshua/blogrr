import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  components: {
    sidebar: false,
    floatAlert: {
      content: "",
      open: false,
      type: "",
    },
  },

  notifications: [],

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
    items: [],

    comments: [],
  },
};

export const promptSlice = createSlice({
  name: "prompt",
  initialState,
  reducers: {
    toggleSideBar: (state, action) => {
      state.components.sidebar = action.payload;
    },
    toggleFloatAlert: (state, action) => {
      state.components.floatAlert = { ...action.payload };
    },
    toggleUserLoading: (state, action) => {
      state.user.loading = action.payload;
    },

    setUserNotifications: (state, action) => {
      state.notifications = action.payload;
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
        bio: "",
        pwd: "",
      };

      state.components = {
        sidebar: false,
        floatAlert: {
          content: "",
          open: false,
          type: "",
        },
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
      };

      state.notifications = {}
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

    setPostComments: (state, action) => {
      state.posts.comments = action.payload;
    },
  },
});

export const {
  toggleSideBar,
  toggleFloatAlert,
  toggleUserLoading,
  setUserNotifications,
  toggleProfileLoading,
  togglePostLoading,
  clearProfileData,
  clearUserData,
  setUserData,
  setPostItem,
  setPostItems,
  setProfile,
  setPostComments,
} = promptSlice.actions;
export const stateReducer = promptSlice.reducer;
