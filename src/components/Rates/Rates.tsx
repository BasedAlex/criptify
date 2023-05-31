import Link from 'next/link'
import React, { useState } from 'react'
import { useGetAllAssetsQuery } from '../../store/fetchAPI/apiSlice'
import Rate from './Rate/Rate'
import { useSelector } from 'react-redux'

const Rates = () => {
	console.log(useSelector(state => state))

	const [offset, setOffset] = useState(0)
	const { data } = useGetAllAssetsQuery(offset)

	const paginate = (num = 20) => {
		let pages: any = []
		let i = 1
		while (i <= num) {
			pages.push(i)
			i++
		}
		return pages
	}

	const handleLeft = () => {
		if (offset > 0) {
			setOffset(offset - 100)
		}
	}

	const handleRight = () => {
		if (offset <= 2000) {
			setOffset(offset + 100)
		}
	}

	const handlePaginate = (e: React.MouseEvent<HTMLDivElement>) => {
		console.log(e)
		setOffset(Number(e.currentTarget.innerText) * 100)
	}

	return (
		<div className='container mx-auto'>
			<div className='bordler-r-2 flex gap-4 mt-4'>
				<Link href='Watchlist'>Watchlist</Link>
				<Link href='Portfolio'>Portfolio</Link>
			</div>
			<div className='grid grid-cols-7fill '>
				<p>#</p>
				<p>Name</p>
				<p>Price </p>
				<p>24h%</p>
				<p>Market Cap</p>
				<p>Volume(24h)</p>
				<p>Supply</p>
			</div>
			<div className=''>
				<Rate data={data} />
			</div>
			<div className='flex gap-4'>
				<div onClick={handleLeft}>Left</div>
				<div className='flex gap-5'>
					{paginate().map((page: any, idx: any) => (
						<div key={idx} onClick={e => handlePaginate(e)}>
							{page}
						</div>
					))}
				</div>
				<div onClick={handleRight}>Right</div>
			</div>
		</div>
	)
}

export default Rates
