import basketReducer from "./features/BasketSlice";
import userReducer from "./features/UserSlice";

import {  configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    user: userReducer,
  },
});
