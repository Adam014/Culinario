import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_KEY, API_HOST, API_BASE_URL } from './apiConfig';

const tastyApiHeader = {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': API_HOST,
};

const createRequest = (url: string) => ({ url, headers: tastyApiHeader });

// TODO: maybe transfer the data to db? and save them there, and then load them from the db instead straight from api

export const recipesApi = createApi({
    reducerPath: 'recipesApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
    endpoints: (builder) => ({
        getRecipes: builder.query({
            query: (count: number) => createRequest(`/recipes/list?from=0&size=${count}`),
        }),
        getRecipeById: builder.query({
            query: (id: number) => createRequest(`/recipe/${id}`), 
        }),
    }),
});

export const { 
    useGetRecipesQuery,
    useGetRecipeByIdQuery,
 } = recipesApi;