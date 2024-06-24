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
    items: [
      {
        _id: 1,
        user_id: 1,
        timestamp: "2h",
        title: "Blorgg Demo Page, This is Blogrr Page, for Demo and Sharing",
        username: "Joshua_Akinleye",
        email: "joshua@email.com",
        img: "",
        content: "This is the content of the page, it below shoes rht econte  ja sd ajsdnasjdnasjd  ajsdnas ajsdnasdasj ajsndasn sdnj sjdns sdjnda asdnsds aanajd ",
        likes: [1,2],
        comments: [{
          _id: 1,
          user_id: 1,
          username: "Josh",
          timestamp: "5m",
        }],
        
      }
    ],
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
  },
});

export const {
  toggleSideBar,
  toggleUserLoading,
  toggleProfileLoading,
  togglePostLoading,
  clearProfileData,
  setUserData,
  setPostItem,
  setPostItems,
  setProfile,
} = promptSlice.actions;
export const stateReducer = promptSlice.reducer;
