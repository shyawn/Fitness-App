import { configureStore, combineReducers } from "@reduxjs/toolkit";
import workoutSlice from "./workoutPlan/workoutSlice";
import mmkvMiddleware from "./mmkvMiddleware";
// import {
//   FLUSH,
//   PAUSE,
//   PERSIST,
//   persistReducer,
//   persistStore,
//   PURGE,
//   REGISTER,
//   REHYDRATE,
// } from "redux-persist";
// import reduxStorage from "./mmkvMiddleware";
// import workoutReducer from "./workoutPlan/workoutSlice";

// const rootReducer = combineReducers({
//   theme: workoutReducer,
// });

// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage: reduxStorage,
//   timeout: 0,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    workout: workoutSlice,
  },
  // reducer: persistedReducer,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   }),
});

// export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
