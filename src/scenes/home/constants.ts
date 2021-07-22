import { Routes } from 'src/navigation/routes'

import { Items } from './types'

export const Sections: Items[] = [
  {
    color: `#68bea5`,
    id: 'ITEM-ID-1',
    name: 'Pokedex',
    routes: Routes.Pokedex,
  },
  {
    color: `#df5c3e`,
    id: 'ITEM-ID-2',
    name: 'Moves',
    routes: Routes.Pokedex,
  },
  {
    color: `#6e91e9`,
    id: 'ITEM-ID-3',
    name: 'Abilities',
    routes: Routes.Pokedex,
  },
  {
    color: `#f0cb53`,
    id: 'ITEM-ID-4',
    name: 'Items',
    routes: Routes.Pokedex,
  },
  {
    color: `#6c5b94`,
    id: 'ITEM-ID-5',
    name: 'Locations',
    routes: Routes.Pokedex,
  },
  {
    color: `#6c594a`,
    id: 'ITEM-ID-6',
    name: 'Type Charts',
    routes: Routes.Pokedex,
  },
]

export const CARD_HEIGHT = 80
export const HEADER_HEIGHT = 140
export const POKEBALL_SIZE = HEADER_HEIGHT + 100
