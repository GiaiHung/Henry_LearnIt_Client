import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authSlice from './authSlice'
import modalSlice from './modal'
import postsSlice from './postsSlice'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['posts', 'modal']
}

const rootReducer = combineReducers({ auth: authSlice, posts: postsSlice, modal: modalSlice })
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }),
})

export let persistor = persistStore(store)
