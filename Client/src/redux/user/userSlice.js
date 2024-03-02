import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  error: null,
  loading: false,
};

// Create a slice
/* 
    A slice is a collection of reducer functions, 
    a slice is created using the createSlice function from the @reduxjs/toolkit package.
*/
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export actions
export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;
// Export reducer
export default userSlice.reducer;
