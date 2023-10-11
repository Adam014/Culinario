import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const recipesApiHeader = {
    'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
    'X-RapidAPI-Key': '1a5c76bad7mshd02968c835e1556p186438jsnf43902ab9551'
}

const baseUrl = 'https://tasty.p.rapidapi.com';

const createRequest = (url: string) => ({url, header: recipesApiHeader})

export const recipesApi = createApi({
    reducerPath: 'recipesApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getRecipes: builder.query({
            query: () => createRequest(`/recipes/list`),
        })
    })
})

export const { useGetRecipesQuery } = recipesApi;
