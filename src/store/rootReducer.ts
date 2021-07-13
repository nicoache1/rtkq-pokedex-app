import { combineReducers } from 'redux'
import { pokemonReducer, reducerPath } from './APIs/pokemonSlice'

export const rootReducer = combineReducers({
  [reducerPath]: pokemonReducer,
})

export type ReduxState = ReturnType<typeof rootReducer>
