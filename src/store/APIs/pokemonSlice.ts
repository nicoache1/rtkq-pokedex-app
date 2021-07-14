import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { deserializePokedex, Pokedex } from 'src/types/pokedex'
import { deserializePokemon, Pokemon } from 'src/types/pokemon'

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: builder => ({
    getAllPokemon: builder.query<Pokedex[], number>({
      query: (offset: number) => `pokemon?limit=20&offset=${offset}"`,
      transformResponse: (response: any) =>
        deserializePokedex(response.results),
    }),
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name: string) => `pokemon/${name}`,
      transformResponse: (response: any) => deserializePokemon(response),
    }),
  }),
})

export const {
  useGetAllPokemonQuery,
  useGetPokemonByNameQuery,
  reducer: pokemonReducer,
  reducerPath,
} = pokemonApi
