'use client'
import React from 'react'
import { useSelector } from 'react-redux'

const Favorite = () => {
	const data = useSelector((state: any) => state.favorite)

	console.log(data)

	return data.favorite.map((item: any) => (
		<div key={item.id} className='grid grid-cols-7fill'>
			<p className=''>{item.rank}</p>
			<p>{item.name}</p>
			<p>{Number(item.priceUsd).toFixed(6)}</p>
			<p>{Number(item.changePercent24Hr).toFixed(6)}</p>
			<p>{Number(item.marketCapUsd).toFixed(6)}</p>
			<p>{Number(item.volumeUsd24Hr).toFixed(6)}</p>
			<p>{Number(item.supply).toFixed(6)}</p>
			<div className='flex gap-4'>
				<button className='border rounded-2xl	 border-sky-400 w-full'>
					Add More
				</button>
				<button className='border rounded-2xl border-sky-400 w-full'>
					Remove
				</button>
			</div>
		</div>
	))
}

export default Favorite
