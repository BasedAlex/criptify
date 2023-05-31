'use client'
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { assetsApi } from './fetchAPI/apiSlice'
import favoriteSlice from './slices/initialSlice'

const rootReducer = {
	favorite: favoriteSlice,
	[assetsApi.reducerPath]: assetsApi.reducer,
}

const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(assetsApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export type RootState = ReturnType<typeof store.getState>

export default store
