'use client'
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { assetsApi } from './fetchAPI/apiSlice'
import favoriteSlice from './slices/initialSlice'
import portfolioSlice from './slices/portfolioSlice'
import balanceSlice from './slices/balanceSlice'
import { pricesApi } from './fetchAPI/useWebSocket'

const rootReducer = {
  favorite: favoriteSlice,
  portfolio: portfolioSlice,
  balance: balanceSlice,
  [assetsApi.reducerPath]: assetsApi.reducer,
  [pricesApi.reducerPath]: pricesApi.reducer,
}

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(assetsApi.middleware, pricesApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export type RootState = ReturnType<typeof store.getState>

export default store
