import { AnyAction, combineReducers } from "@reduxjs/toolkit";
import userSlice, { logout } from "core/store/userSlice";
import scenerySlice from "features/scenery/store/scenerySlice";
import characterSlice from "features/character/store/characterSlice";
import actSlice from "features/act/store/actSlice";

const combinedReducer = combineReducers({
  user: userSlice,
  scenery: scenerySlice,
  character: characterSlice,
  act: actSlice,
});

// if you export RootState here, then import it in store.ts and re-rexport it and then export it in src/commo/store/index.ts then when you will try to import RootState VSC will import it from store.ts, not from here (rootReducer.ts)
export type RootState = ReturnType<typeof combinedReducer>;

const rootReducer = (rootState: RootState | undefined, action: AnyAction) => {
  if (action.type === logout.fulfilled.type) {
    if (rootState) {
      rootState = undefined;
    }
  }
  return combinedReducer(rootState, action);
};

export default rootReducer;

// ReturnType<typeof combinedReducer> and ReturnType<typeof rootReducer> ARE THE SAME TYPES
