import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Config from 'react-native-config'
import { deserializeNews, News } from 'src/types/news'

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://newsapi.org/v2/',
  }),
  endpoints: builder => ({
    getPokemonHeadlines: builder.query<News[], number>({
      query: (page: number) =>
        `/everything?q=pokemon&apikey=${Config.NEWS_API_KEY}&page=${page}`,
      transformResponse: (response: any) => deserializeNews(response.articles),
    }),
  }),
})

export const {
  useGetPokemonHeadlinesQuery,
  reducer: newsReducer,
  reducerPath,
} = newsApi
