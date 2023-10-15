import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import basketReducer from "./features/BasketSlice";
import userReducer from "./features/UserSlice";

import {  combineReducers, configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    user: userReducer,
  },

});






