'use client'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	portfolio: [],
	totalPortfolioItems: 0,
}

export const portfolioSlice = createSlice({
	name: 'portfolio',
	initialState,
	reducers: {
		addToPortfolio: (state: any, action: any) => {
			console.log(action.payload)
			state.portfolio.push(action.payload)
			state.totalPortfolioItems++
		},
		removeFromPortfolio: (state: any, action: any) => {
			const currentPort = state.portfolio.filter(
				(item: any) => item.id !== action.payload.id
			)
			state.portfolio = currentPort
		},
		removeItemFromPortfolio: (state: any, action: any) => {
			const portIndex = state.portfolio.findIndex(
				(item: any) => item.id === action.payload.id
			)
			if (portIndex >= 0 && state.portfolio[portIndex].portQuantity > 1) {
				state.portfolio[portIndex].portQuantity -= 1
				state.totalPortfolioItems--
			}
		},
	},
})

export const { addToPortfolio, removeFromPortfolio, removeItemFromPortfolio } =
	portfolioSlice.actions
export default portfolioSlice.reducer
