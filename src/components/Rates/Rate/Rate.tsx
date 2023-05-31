'use client'
import { useAppDispatch } from '@/components/store'
import { addToFav } from '@/components/store/slices/initialSlice'
import { useDispatch } from 'react-redux'
import React from 'react'

const Rate = (data: any): any => {
	const dispatch = useDispatch()
	const handleAddToFav = (data: any) => {
		dispatch(addToFav(data))
	}

	return data?.data?.data?.map((item: any) => (
		<div key={item.id} className='grid grid-cols-7fill'>
			<p className=''>{item.rank}</p>
			<p>{item.name}</p>
			<p>{Number(item.priceUsd).toFixed(6)}</p>
			<p>{Number(item.changePercent24Hr).toFixed(6)}</p>
			<p>{Number(item.marketCapUsd).toFixed(6)}</p>
			<p>{Number(item.volumeUsd24Hr).toFixed(6)}</p>
			<p>{Number(item.supply).toFixed(6)}</p>
			<div className='flex gap-4'>
				<button
					className='border rounded-2xl	 border-sky-400 w-full'
					onClick={() => handleAddToFav(item)}
				>
					Add
				</button>
				<button className='border rounded-2xl border-sky-400 w-full'>
					Remove
				</button>
			</div>
		</div>
	))
}

export default Rate
