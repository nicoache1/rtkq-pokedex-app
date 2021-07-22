import { PokemonURLResource } from 'src/types'

type ColorMap = { [key: string]: string }

const typeColors: ColorMap = {
  ['bug']: '#abb742',
  ['dark']: '#6c594a',
  ['dragon']: '#6745ef',
  ['electric']: '#f0cb53',
  ['fairy']: `#eba5dd`,
  ['fighting']: `#85372d`,
  ['fire']: `#df5c3e`,
  ['flying']: `#a393ea`,
  ['ghost']: `#6c5b94`,
  ['grass']: `#68bea5`,
  ['ground']: `#dbc075`,
  ['ice']: `#a5d6d7`,
  ['normal']: `#a8a77d`,
  ['poison']: `#94499b`,
  ['psychic']: `#e66489`,
  ['rock']: `#b4a14b`,
  ['shadow']: `#3e3345`,
  ['steel']: `#b8b8ce`,
  ['unknown']: `#759f91`,
  ['water']: `#6e91e9`,
}

interface Ability {
  isHidden: true
  slot: number
  ability: PokemonURLResource
}

interface GameIndex {
  gameIndex: number
  version: PokemonURLResource
}

interface HeldItem {
  item: PokemonURLResource
}

interface Move {
  move: PokemonURLResource
  versionGroupDetails: {
    levelLearnedAt: number
    versionGroup: PokemonURLResource
    moveLearnMethod: PokemonURLResource
  }[]
}

interface Stats {
  baseStat: number
  effort: number
  stat: PokemonURLResource
}

interface Type {
  slot: number
  type: {
    name: string
    color: string
  }
}

export interface Pokemon {
  id: number
  name: string
  baseExperience: number
  height: number
  isDefault: boolean
  order: number
  weight: number
  abilities: Ability[]
  forms: PokemonURLResource[]
  gameIndices: GameIndex[]
  heldItems: HeldItem[]
  locationAreaEncounters: string
  moves: Move[]
  species: PokemonURLResource
  sprite: string
  stats: Stats[]
  types: Type[]
}

export const deserializePokemons = (data: any): Pokemon[] => {
  return data.map((pokemonItem: any) => deserializePokemon(pokemonItem))
}

export const deserializePokemon = (data: any): Pokemon => ({
  abilities: deserializeAbilities(data.abilities ?? []),
  baseExperience: data.base_experience,
  forms: data.forms,
  gameIndices: deserializeGameIndices(data.game_indices ?? []),
  height: data.height,
  heldItems: deserializeHeldItem(data.held_items ?? []),
  id: data.id,
  isDefault: data.is_default,
  locationAreaEncounters: data.location_area_encounters,
  moves: deserializeMoves(data.moves ?? []),
  name: data.name,
  order: data.order,
  species: data.species,
  sprite:
    data.sprites.other['official-artwork']?.front_default ??
    data.sprites?.front_default,
  stats: deserializeStats(data.stats ?? []),
  types: deserializeTypes(data.types ?? []),
  weight: data.weight,
})

const deserializeAbilities = (data: any): Ability[] =>
  data.map((item: any) => ({
    ability: item.ability,
    isHidden: item.is_hidden,
    slot: item.slot,
  }))

const deserializeGameIndices = (data: any): GameIndex[] =>
  data.map((item: any) => ({
    gameIndex: item.game_index,
    version: item.version,
  }))

const deserializeHeldItem = (data: any): HeldItem[] =>
  data.map((item: any) => ({
    item,
  }))

const deserializeMoves = (data: any): Move[] =>
  data.map((item: any) => ({
    move: item.move,
    versionGroupDetails: item.version_group_details.map((newItem: any) => ({
      levelLearnedAt: newItem.level_learned_at,
      moveLearnMethod: newItem.move_learn_method,
      versionGroup: newItem.version_group,
    })),
  }))

const deserializeStats = (data: any): Stats[] =>
  data.map((item: any) => ({
    baseStat: item.base_stat,
    effort: item.effort,
    stat: item.stat,
  }))

const deserializeTypes = (data: any): Type[] =>
  data.map((item: any) => ({
    slot: item.slot,
    type: getTypeColor(item.type),
  }))

const getTypeColor = (type: PokemonURLResource) => {
  const color = typeColors[type.name]
  return {
    color,
    name: type.name,
  }
}
