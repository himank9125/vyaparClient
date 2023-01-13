import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Name: null,
  Token: null,
  Email: null,
};

const store = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    saveName: (state, action) => {
      state.Name = action.payload;
    },
    saveToken: (state, action) => {
      state.Token = action.payload;
    },
    saveEmail: (state, action) => {
      state.Email = action.payload;
    },
  },
});

export const { saveName, saveToken, saveEmail } = store.actions;

export default store.reducer;
