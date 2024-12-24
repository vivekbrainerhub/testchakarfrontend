import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
  token: "",
  currentuser: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      // Add logic to set user if needed
    },
    setToken: (state, action) => {
      console.log(action.payload, "action");
      state.token = action.payload.token;
      state.currentuser = action.payload.result;
    },
    setReset: (state) => {
      state.token = "";
      state.user = [];
      state.currentuser = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setToken, setReset } = userSlice.actions;

export default userSlice.reducer;
