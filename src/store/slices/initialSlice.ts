'use client'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	favorite: [],
	totalFavoriteItems: 0,
}

export const favoriteSlice = createSlice({
	name: 'favorite',
	initialState,
	reducers: {
		addToFav: (state: any, action: any) => {
			const favIndex = state.favorite.findIndex(
				(item: any) => item.id === action.payload.id
			)
			console.log(favIndex)
			if (favIndex >= 0) {
				console.log(state.portfolio)
				state.favorite[favIndex].favoriteQuantity += 1
			} else {
				state.favorite.push({
					...action.payload,
					favoriteQuantity: 1,
				})
			}
			state.totalFavoriteItems++
		},
		removeFromFav: (state: any, action: any) => {
			const currentFav = state.favorite.filter(
				(item: any) => item.id !== action.payload.id
			)
			state.favorite = currentFav
		},
		removeItemFromFav: (state: any, action: any) => {
			const favIndex = state.favorite.findIndex(
				(item: any) => item.id === action.payload.id
			)
			if (favIndex >= 0 && state.favorite[favIndex].favoriteQuantity > 1) {
				state.favorite[favIndex].favoriteQuantity -= 1
				state.totalFavoriteItems--
			}
		},
	},
})

// export const favoriteAction = favoriteSlice.actions
export const { addToFav, removeFromFav, removeItemFromFav } =
	favoriteSlice.actions
export default favoriteSlice.reducer
