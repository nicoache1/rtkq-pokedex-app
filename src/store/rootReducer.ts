import { combineReducers } from 'redux'
import { pokemonReducer, reducerPath } from './APIs/pokemonSlice'
import { newsReducer, reducerPath as newsReducerPath } from './APIs/newsSlice'

export const rootReducer = combineReducers({
  [reducerPath]: pokemonReducer,
  [newsReducerPath]: newsReducer,
})

export type ReduxState = ReturnType<typeof rootReducer>
