import useDebounce from '@/components/hooks/useDebounce'
import { useGetAssetQuery } from '@/components/store/fetchAPI/apiSlice'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

type SearchType = {
	data: dataType
	singleAssetData: dataType
}

type dataType = {
	id: string
	rank: string
	symbol: string
	name: string
}

const Header = () => {
	const [search, setSearch] = useState('')
	const [skip, setSkip] = React.useState(true)
	const debouncedValue = useDebounce<string>(search, 1500)
	const { data: singleAssetData } = useGetAssetQuery(debouncedValue, {
		skip,
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)
		debouncedValue !== '' ? setSkip(false) : setSkip(true)
	}

	return (
		<header className='border-b-2'>
			<div className='flex gap-4 my-5 justify-between container mx-auto '>
				<Link className='text-xl' href='/'>
					Cripto Hub
				</Link>
				<div className='flex gap-4 '>
					<Link href='/Watchlist' className='leading-8'>
						Watchlist
					</Link>
					<Link href='/Portfolio' className='leading-8'>
						Portfolio
					</Link>
					<input
						placeholder='Search'
						value={search}
						onChange={e => {
							handleChange(e)
						}}
					/>
					<button>Toggle Skip ({String(skip)})</button>
				</div>
			</div>
			{search && (
				<div className='container mx-auto'>{singleAssetData?.data.id}</div>
			)}
		</header>
	)
}

export default Header
