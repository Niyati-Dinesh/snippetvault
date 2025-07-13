//Redux for storing snippets

import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './authSlice'
import snippetReducer from './snippetSlice'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import { thunk } from 'redux-thunk' // ✅ FIXED

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'snippet'],
}

const rootReducer = combineReducers({
  auth: authReducer,
  snippet: snippetReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

const persistor = persistStore(store)

export { store, persistor }
