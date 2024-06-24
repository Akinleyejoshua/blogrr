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
      {
        _id: 1,
        user_id: 1,
        timestamp: "2h",
        title: "Blorgg Demo Page, This is Blogrr Page, for Demo and Sharing",
        username: "Joshua_Akinleye",
        email: "joshua@email.com",
        img: "",
        content: `
                  Lorem ipsum dolor sit amet consectetur 
                  adipisicing elit. 
                  Officia debitis facere voluptates 
                  explicabo laborum illum 
                  ducimus natus repudiandae accusantium molestias mollitia 
                  harum corporis dolorem iure, tempore optio soluta in quo!
        `,
        likes: [1, 2],
        comments: [
          {
            _id: 1,
            user_id: 1,
            username: "Joshua_Akinleye",
            timestamp: "5m",
            content: "Nice Content",
          },
        ],
      },
      {
        _id: 2,
        user_id: 2,
        timestamp: "5d",
        title: "This paper examines the theological controversies surrounding the observance of Easter by the Roman Catholic Church ",
        username: "Moyinoluwa",
        email: "joshua@email.com",
        img: "",
        content: `
        This paper examines the theological controversies surrounding the observance of 
        Easter by the Roman Catholic Church with historical facts, the Orthodox Churches and the 
        Protestant Churches. The paper views Easter as resurrection from the German word ‘ausferstehung’. 
        Though the Greeks and Hebrews coin it from ‘Pascha’/
        ‘Pesach’ to mean Passover. The paper took guidance from the scriptures as to how, if at all, the 
        Church is to celebrate the resurrection. The paper examines the controversies and the Nicaea council’s 
        ruling which had ulterior motive of distancing the church from its Jewish roots as against the publicized 
        motive of unity. The paper concludes that the church must not depart from Biblical truth in celebrating  
        Easter  and  recommends  accordingly that  the  end  time  churches should look at the Gospel and its own 
        history rather than the stars for its times of festival worships of Ishtar. Weeping for Tammuz for a period 
        of 40 days prior to the great festival of Ishtar/Easter was replaced by Christian 40 days to commensurate 
        40 days of Jesus Christ fasting/lent before Easter should be used to fast and seek the face of God for mercy.
        This paper admonish Christian should allow the grant of holiday by the government of the nation in 
        recognition of Jesus resurrection should not go without good use of it for any spiritual retreat, 
        since it has been governmentally approved

        `,
        likes: [1, 2],
        comments: [
          {
            _id: 1,
            user_id: 1,
            username: "Moyinoluwa",
            timestamp: "5m",
            content: `This is a content, i love this ariticel on the blog platform it's greate!`,
          },
          {
            _id: 1,
            user_id: 1,
            username: "Moyinoluwa",
            timestamp: "5m",
            content: `This is a content, i love this ariticel on the blog platform it's greate!`,
          },
        ],
      },
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
} = promptSlice.actions;
export const stateReducer = promptSlice.reducer;
