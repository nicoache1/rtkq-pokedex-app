import { PokemonURLResource } from 'src/types'

export interface Evolution {
  chain: {
    evolves_to?: {
      evolution_details: {
        trigger: PokemonURLResource
        min_level: number
      }[]
      evolves_to?: {
        species: PokemonURLResource
        evolution_details: {
          trigger: PokemonURLResource
          min_level: number
        }[]
        evolves_to?: {
          species: PokemonURLResource
          evolution_details: {
            trigger: PokemonURLResource
            min_level: number
          }[]
        }[]
      }[]
    }[]
    species: PokemonURLResource
  }
}
