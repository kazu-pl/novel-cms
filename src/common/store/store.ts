import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import rootReducer, { RootState } from "./rootReducer";

import { Middleware } from "@reduxjs/toolkit";

const throwMiddleware: Middleware = () => (next) => (action) => {
  next(action);
  if (action?.error) {
    throw action.payload;
  }
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(throwMiddleware),
});

export type AppDispatch = typeof store.dispatch;

export type { RootState };

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
