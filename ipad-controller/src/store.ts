import { configureStore } from "@reduxjs/toolkit";
import urlSlice from "./reducers/urlSlice";
import basketSlice from "./modules/basket/reducer";

export const store = configureStore({
  reducer: { url: urlSlice, basket: basketSlice },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
