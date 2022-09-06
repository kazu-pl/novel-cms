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
  // change logout.fulfilled.type to logout.pending.type to make sure that store will reset itself right after dispatching action, not when server sends 200 after logut action. It's just to make sure that there won't be any delays between sending logout action, reseting store and removing tokens
  if (action.type === logout.pending.type) {
    if (rootState) {
      rootState = undefined;
    }
  }
  return combinedReducer(rootState, action);
};

export default rootReducer;

// ReturnType<typeof combinedReducer> and ReturnType<typeof rootReducer> ARE THE SAME TYPES
