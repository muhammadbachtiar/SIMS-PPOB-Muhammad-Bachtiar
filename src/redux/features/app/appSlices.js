import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  errorMessage: null,
  isError: false,
  banner: [],
  service: [],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setErrorStatus: (state, action) => {
      state.isError = action.payload;
    },
    setBanner: (state, action) => {
      state.banner = action.payload;
    },
    setService: (state, action) => {
      state.service = action.payload;
    },
    cleareStatusApp: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.isLoading = false;
      state.banner = null;
      state.service = null;
    },
  },
});

export const { setErrorMessage, setErrorStatus, setLoading,setBanner, setService, cleareStatusApp } = appSlice.actions;
export default appSlice.reducer;
