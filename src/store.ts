import {configureStore} from "@reduxjs/toolkit";
import {gameBoardReducer} from "Redux/game";

const store = configureStore({
    reducer: {
        gameBoardReducer
    },
});
export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch