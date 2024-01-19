import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profileState: 1,
};

export const profileSlice = createSlice({
  name: "profileState",
  initialState,
  reducers: {
    setProfileState: (state, action) => {
      state.profileState = action.payload;
    },
  },
});

export const { setProfileState } = profileSlice.actions;
export default profileSlice.reducer;
