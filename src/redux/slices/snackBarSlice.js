import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  open: null,
  message: null,
  type: null,
};
export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    openSnackbar: (state, action) => {
      state.open = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },

    closeSnackbar: (state, action) => {
      state.open = false;
      state.type = action.payload.type;
    },
  },
});

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
