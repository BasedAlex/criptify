'use client'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type initialState = {
	balance: number
	buyoutBalance: number
	isAccepted: boolean
}

const initialState = {
	balance: 5000,
	buyoutBalance: 0,
	isAccepted: false,
}

export const balanceSlice = createSlice({
	name: 'balance',
	initialState,
	reducers: {
		increaseBuyoutBalance: (
			state: initialState,
			action: PayloadAction<number>
		) => {
			state.buyoutBalance += action.payload
		},
		acceptPayment: (state: initialState) => {
			state.isAccepted = true
		},
		increaseActualBalance: (state: initialState) => {
			if (state.isAccepted) {
				state.balance += state.buyoutBalance
				state.isAccepted = false
				state.buyoutBalance = 0
			}
		},
		decreaseBalance: (state: initialState, action: PayloadAction<number>) => {
			state.balance -= action.payload
		},
	},
})

export const {
	increaseBuyoutBalance,
	acceptPayment,
	increaseActualBalance,
	decreaseBalance,
} = balanceSlice.actions

export default balanceSlice.reducer
