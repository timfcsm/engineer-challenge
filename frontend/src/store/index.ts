import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit'
import policiesReducer from './reducers/policies-reducer'

const rootReducer = combineReducers({
  policies: policiesReducer,
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>configureStore({
  reducer: rootReducer,
  preloadedState,
})
 

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
