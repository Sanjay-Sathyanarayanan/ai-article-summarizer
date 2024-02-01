import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {articleApi} from './article';

//store is a global state and reducer is a part of the  state 

export const store = configureStore({
    reducer: {
        [articleApi.reducerPath]: articleApi.reducer
    },
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(articleApi.middleware)
});