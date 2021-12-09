import { configureStore } from "@reduxjs/toolkit";
import scoreReducer from "../modules/basket/score/reducer";
import firiLogoReducer from "../modules/basket/firilogo/reducer";
import gameReducer from "./../modules/basket/team/reducer";
import sponsorReducer from "../modules/basket/sponsors/reducer";
import configReducer from "../modules/basket/basketconfig";
import nameReducer from "../modules/basket/names/reducer";

export const store = configureStore({
  reducer: {
    config: configReducer,
    score: scoreReducer,
    firiLogo: firiLogoReducer,
    sponsors: sponsorReducer,
    game: gameReducer,
    nameOverlay: nameReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
