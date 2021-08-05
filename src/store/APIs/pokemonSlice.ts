import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Evolution } from 'src/types/evolution'
import { deserializePokedex, Pokedex } from 'src/types/pokedex'
import { deserializePokemon, Pokemon } from 'src/types/pokemon'
import { deserializePokemonSpecies, PokemonSpecies } from 'src/types/species'

export const pokemonApi = createApi({
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
    getPokemonEvolution: builder.query<Evolution, string>({
      query: (id: string) => `evolution-chain/${id}`,
      transformResponse: (response: Evolution) => response,
    }),
    getPokemonSpecies: builder.query<PokemonSpecies, string>({
      query: (name: string) => `pokemon-species/${name}`,
      transformResponse: (response: any) => deserializePokemonSpecies(response),
    }),
  }),
  reducerPath: 'pokemonApi',
})

export const {
  useGetAllPokemonQuery,
  useGetPokemonByNameQuery,
  useGetPokemonSpeciesQuery,
  useLazyGetPokemonEvolutionQuery,
  reducer: pokemonReducer,
  reducerPath,
} = pokemonApi
