import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { stateReducer } from './features/state'

const rootReducer = combineReducers({
  state: stateReducer,
})

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}
