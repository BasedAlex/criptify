'use client'
import useDebounce from '@/components/hooks/useDebounce'
import { useGetAssetQuery } from '@/components/store/fetchAPI/apiSlice'
import { RootState } from '@/components/store'
import Link from 'next/link'
import React, { FC, useEffect, useState } from 'react'
import Pointer from '../../../public/svg/Pointer'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../UI/Modal/Modal'
import Donation from '../Donation/Donation'
import { increaseActualBalance } from '@/components/store/slices/balanceSlice'

const Header: FC = ({}) => {
	const [search, setSearch] = useState('')
	const [openModal, setOpenModal] = useState(false)
	const [skip, setSkip] = React.useState(true)
	const debouncedValue = useDebounce(search, 1500)
	const { data: singleAssetData } = useGetAssetQuery(debouncedValue, {
		skip,
	})
	const dispatch = useDispatch()

	const balance = useSelector((state: RootState) => state.balance.balance)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)
		setSkip(false)
	}

	useEffect(() => {
		dispatch(increaseActualBalance())
	})

	console.log(singleAssetData)

	return (
		<header className='border-b-2'>
			<div className='flex gap-4 my-5 justify-between container mx-auto '>
				<Link className='text-xl' href='/'>
					Cripto Hub
				</Link>
				<div className='flex gap-4 '>
					<Link
						href='/watchlist'
						className='flex leading-8 hover:text-cyan-400'
					>
						<div className='pt-2'>
							<Pointer />
						</div>

						<div className=''>Watchlist</div>
					</Link>
					<Link href='/portfolio' className='leading-8 hover:text-cyan-400'>
						Portfolio
					</Link>
					<input
						placeholder='Search'
						value={search}
						onChange={e => {
							handleChange(e)
						}}
					/>

					<div>Current Balance: {balance}</div>
					<button
						className='border border-cyan-400 rounded-lg p-2'
						onClick={() => setOpenModal(!openModal)}
					>
						Increase balance
					</button>
				</div>
			</div>
			<div>{singleAssetData?.data.id}</div>
			{openModal && (
				<Modal active={openModal} setActive={setOpenModal}>
					<Donation />
				</Modal>
			)}
		</header>
	)
}

export default Header
