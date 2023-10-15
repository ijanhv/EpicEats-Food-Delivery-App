import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import basketReducer from "./features/BasketSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
});

// const persistedReducer = persistReducer(persistConfig, reducers);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       thunk: {},
//       serializableCheck: false,
//     }),
// });

// export const persistor = persistStore(store);
