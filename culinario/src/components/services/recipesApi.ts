import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const { VITE_REACT_APP_RAPIDAPI_KEY } = import.meta.env;

const tastyApiHeader = {
    'X-RapidAPI-Key': VITE_REACT_APP_RAPIDAPI_KEY,
    'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
}

// base url API
const baseUrl = 'https://tasty.p.rapidapi.com';

const createRequest = (url: string) => ({url, headers: tastyApiHeader})

export const recipesApi = createApi({
    reducerPath: 'recipesApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getRecipes: builder.query({
            query: (count) => createRequest(`/recipes/list?from=0&size=${count}`),
        })
    })
})

export const { useGetRecipesQuery } = recipesApi;
