import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

import { ReduxState, rootReducer } from './rootReducer'

const middlewares = [thunk]

// TODO: uncomment this to use the redux debugger on flipper
if (__DEV__) {
  const createDebugger = require('redux-flipper').default
  middlewares.push(createDebugger())
}

const store = configureStore({
  middleware: middlewares,
  reducer: rootReducer,
})

export type AppDispatch = typeof store.dispatch

export interface ThunkApiConfig {
  // Optional fields for defining thunkApi field types
  dispatch: AppDispatch
  state: ReduxState
}

export { store }
