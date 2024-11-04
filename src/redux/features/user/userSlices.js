import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
  balance: 0,
  transactionHistory: []
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoginStatus: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setBalance: (state, action) => {
        state.balance = action.payload;
      },
    setTransactionHistory: (state, action) => {
        state.transactionHistory = action.payload;
    },
    clearUser: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.balance = 0;
      state.transactionHistory = [];
    },
  },
});

export const { setLoginStatus, setUser, setBalance, setTransactionHistory, clearUser } = userSlice.actions;
export default userSlice.reducer;
