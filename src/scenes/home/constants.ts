import { Routes } from 'src/navigation/routes'
import { Items } from './types'

export const Sections: Items[] = [
  {
    name: 'Pokedex',
    id: 'ITEM-ID-1',
    color: `#68bea5`,
    routes: Routes.Pokedex,
  },
  {
    name: 'Moves',
    id: 'ITEM-ID-2',
    color: `#df5c3e`,
    routes: Routes.Pokedex,
  },
  {
    name: 'Abilities',
    id: 'ITEM-ID-3',
    color: `#6e91e9`,
    routes: Routes.Pokedex,
  },
  {
    name: 'Items',
    id: 'ITEM-ID-4',
    color: `#f0cb53`,
    routes: Routes.Pokedex,
  },
  {
    name: 'Locations',
    id: 'ITEM-ID-5',
    color: `#6c5b94`,
    routes: Routes.Pokedex,
  },
  {
    name: 'Type Charts',
    id: 'ITEM-ID-6',
    color: `#6c594a`,
    routes: Routes.Pokedex,
  },
]

export const CARD_HEIGHT = 80
export const HEADER_HEIGHT = 180
export const POKEBALL_SIZE = HEADER_HEIGHT + 100
