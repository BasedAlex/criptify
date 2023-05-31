'use client'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	favorite: [],
}

export const favoriteSlice = createSlice({
	name: 'favorite',
	initialState,
	reducers: {
		addToFav: (state: any, action: any) => {
			state.favorite.push(action.payload)
		},
	},
})

// export const favoriteAction = favoriteSlice.actions
export const { addToFav } = favoriteSlice.actions
export default favoriteSlice.reducer
