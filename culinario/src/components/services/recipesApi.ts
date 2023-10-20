import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_KEY, API_HOST, API_BASE_URL } from './apiConfig';

const tastyApiHeader = {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': API_HOST,
};

const createRequest = (url: string) => ({ url, headers: tastyApiHeader });

export const recipesApi = createApi({
    reducerPath: 'recipesApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
    endpoints: (builder) => ({
        getRecipes: builder.query({
            query: (count) => createRequest(`/recipes/list?from=0&size=${count}`),
        }),
        getRecipeDetails: builder.query({
            query: (id) => createRequest(`/recipe/${id}`),
        }),
    }),
});

export const { 
    useGetRecipesQuery,
    useGetRecipeDetailsQuery,
 } = recipesApi;