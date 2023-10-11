import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// fix it - error 401 - unauthorized

const tastyApiHeader = {
    'X-RapidAPI-Key': '9dc29de3d5msh0761f1f4542b5dap1b216ejsn20a35a96245d',
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
