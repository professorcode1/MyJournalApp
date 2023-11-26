import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import screenReducer from "./screen"
import passwordReducer from "./password"
import currentEntryReducer from "./current_entry"
import homepageReducer from "./homepage"
const store = configureStore({
  reducer: {
      screen: screenReducer,
      password: passwordReducer,
      currentEntry:currentEntryReducer,
      homepage:homepageReducer
    }
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export {store}