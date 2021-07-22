export interface PokemonSpecies {
  id: number
  name: string
  isLegendary: number
  isMythical: boolean
  isBaby: boolean
  about: string
}

export const deserializePokemonSpecies = (data: any): PokemonSpecies => ({
  about: deserializeTextEntry(data.flavor_text_entries),
  id: data.id,
  isBaby: data.isBaby,
  isLegendary: data.isLegendary,
  isMythical: data.isMythical,
  name: data.name,
})

const deserializeTextEntry = (data: any[]): string => {
  const entryIndex = data.findIndex(
    entry =>
      entry.language.name.toLowerCase() === 'EN'.toLowerCase() &&
      entry.version.name.toLowerCase() === 'shield',
  )
  return entryIndex !== -1 ? data[entryIndex].flavor_text : 'No data available'
}
