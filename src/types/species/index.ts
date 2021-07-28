import { PokemonURLResource } from 'src/types'

export interface PokemonSpecies {
  id: number
  name: string
  isLegendary: number
  isMythical: boolean
  isBaby: boolean
  about: string
  eggGroups: PokemonURLResource[]
  shape: PokemonURLResource
  genderRate: number
}

export const deserializePokemonSpecies = (data: any): PokemonSpecies => ({
  about: deserializeTextEntry(data.flavor_text_entries),
  eggGroups: deserializeEggGroups(data.egg_groups),
  genderRate: data.gender_rate,
  id: data.id,
  isBaby: data.isBaby,
  isLegendary: data.isLegendary,
  isMythical: data.isMythical,
  name: data.name,
  shape: data.shape,
})

const deserializeTextEntry = (data: any[]): string => {
  const entryIndex = data.findIndex(
    entry =>
      entry.language.name.toLowerCase() === 'EN'.toLowerCase() &&
      entry.version.name.toLowerCase() === 'shield',
  )
  return entryIndex !== -1 ? data[entryIndex].flavor_text : 'No data available'
}

const deserializeEggGroups = (data: any[]): PokemonURLResource[] =>
  data.map(item => ({
    name: item.name,
    url: item.url,
  }))
