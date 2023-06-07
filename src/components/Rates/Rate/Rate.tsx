'use client'
import { addToFav } from '@/components/store/slices/initialSlice'
import { useDispatch } from 'react-redux'
import React from 'react'
import ToolTip from '../../UI/ToolTip/ToolTip'

const Rate = ({ data, handleOpenModal }: any): any => {
	const dispatch = useDispatch()
	const handleAddToFav = (data: any) => {
		dispatch(addToFav(data))
	}

	return (
		<div className='grid grid-cols-7fill'>
			<p className=''>{data.rank}</p>
			<p>{data.name}</p>
			<ToolTip tooltip={data.priceUsd}>
				{Number(data.priceUsd).toFixed(2)}
			</ToolTip>
			<p>{Number(data.changePercent24Hr).toFixed(2)}</p>
			<p>{Number(data.marketCapUsd).toFixed(2)}</p>
			<p>{Number(data.volumeUsd24Hr).toFixed(2)}</p>
			<p>{Number(data.supply).toFixed(2)}</p>
			<div className='flex gap-4'>
				<button
					className='border rounded-2xl	 border-sky-400 w-full'
					onClick={() => handleAddToFav(data)}
				>
					Add to fav
				</button>
				<button
					className='border rounded-2xl border-sky-400 w-full'
					onClick={() => handleOpenModal(data)}
				>
					Add to portfolio
				</button>
			</div>
		</div>
	)
}

export default Rate
