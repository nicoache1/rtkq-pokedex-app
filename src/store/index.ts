import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import thunk from 'redux-thunk'

import { newsApi } from './APIs/newsSlice'
import { pokemonApi } from './APIs/pokemonSlice'
import { ReduxState, rootReducer } from './rootReducer'

const middlewares = [thunk, pokemonApi.middleware, newsApi.middleware]

// TODO: uncomment this to use the redux debugger on flipper
if (__DEV__) {
  const createDebugger = require('redux-flipper').default
  middlewares.push(createDebugger())
}

const store = configureStore({
  middleware: middlewares,
  reducer: rootReducer,
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch

export interface ThunkApiConfig {
  // Optional fields for defining thunkApi field types
  dispatch: AppDispatch
  state: ReduxState
}

export { store }
