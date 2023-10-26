import { configureStore } from "@reduxjs/toolkit";

import { recipesApi } from "../services/api/recipesApi";

export default configureStore({
    reducer: {
        [recipesApi.reducerPath]: recipesApi.reducer,
    },
    middleware: ( getDefaultMiddleware ) => 
        getDefaultMiddleware().concat( recipesApi.middleware),
});