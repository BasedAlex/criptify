'use client'
import { RootState } from '@/components/store'
import {
	removeFromPortfolio,
	removeItemFromPortfolio,
} from '@/components/store/slices/portfolioSlice'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const PortfolioComponent = () => {
	const data = useSelector((state: RootState) => state.portfolio)
	const dispatch = useDispatch()

	const handleRemove = (data: any) => {
		dispatch(removeFromPortfolio(data))
	}
	const handleRemoveOne = (data: any) => {
		dispatch(removeItemFromPortfolio(data))
	}

	console.log(data)

	return (
		<div className='container mx-auto'>
			<div className='grid grid-cols-7fill '>
				{' '}
				<p>Quantity</p>
				<p>Name</p>
				<p>Bought for Price (Total) </p>
				<p>24h%</p>
				<p>Market Cap</p>
				<p>Volume(24h)</p>
				<p>Supply</p>
			</div>

			{data.portfolio.map((item: any) => (
				<div key={item.id} className='grid grid-cols-7fill '>
					<p className=''>{item.donate}</p>
					<p>{item.name}</p>
					<p>
						{Number(item.priceUsd).toFixed(6)} (
						{(item.priceUsd * item.donate).toFixed(6)})
					</p>
					<p>{Number(item.changePercent24Hr).toFixed(6)}</p>
					<p>{Number(item.marketCapUsd).toFixed(6)}</p>
					<p>{Number(item.volumeUsd24Hr).toFixed(6)}</p>
					<p>{Number(item.supply).toFixed(6)}</p>
					<div className='flex gap-4'>
						{/* <button className='border rounded-2xl	 border-sky-400 w-full'>
							Add More
						</button>
						<button
							className='border rounded-2xl border-sky-400 w-full'
							onClick={() => {
								handleRemoveOne(item)
							}}
						>
							Remove One
						</button> */}
						<button
							className='border rounded-2xl border-sky-400 w-full'
							onClick={() => {
								handleRemove(item)
							}}
						>
							Remove All
						</button>
					</div>
				</div>
			))}
		</div>
	)
}

export default PortfolioComponent
