import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlices"
import appReducer from "./features/app/appSlices"

const store = configureStore({
    reducer: {
      user: userReducer,
      app: appReducer,
    },
  });
  
  export default store;