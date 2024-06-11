// src/redux/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  email: "",
  firstName: "",
  image: "",
  lastName: "",
  _id: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      state.isLoggedIn = true
      state._id = action.payload.user._id;
      state.fullName = action.payload.user.fullName;
      state.email = action.payload.user.email;
      state.image = action.payload.user.image;
    },
    logoutRedux: (state) => {
      state.isLoggedIn = false;
      state._id = "";
      state.fullName = "";
      state.email = "";
      state.image = "";
    },
    setUserData: (state, action) => {
      state.isLoggedIn = true;
      state._id = action.payload.user._id;
      state.firstName = action.payload.user.firstName;
      state.lastName = action.payload.user.lastName;
      state.email = action.payload.user.email;
      state.image = action.payload.user.image;
    },
  },
});

export const { loginRedux, logoutRedux, setUserData } = userSlice.actions;

export default userSlice.reducer;
