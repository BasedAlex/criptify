'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { useGetAllAssetsQuery } from '../../store/fetchAPI/apiSlice'
import Rate from './Rate/Rate'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../UI/Modal/Modal'
import Toaster from '../UI/Toaster/Toaster'
import { addToPortfolio } from '@/store/slices/portfolioSlice'
import { RootState } from '@/store/index'
import { decreaseBalance } from '@/store/slices/balanceSlice'

const Rates = () => {
	console.log(useSelector(state => state))
	const [openPort, setOpenPort] = useState(false)
	const [toast, setToast] = useState(false)
	const [message, setMessage] = useState<string>('')
	const [portItem, setPortItem] = useState<any>({})
	const [donate, setDonate] = useState(1)
	const [offset, setOffset] = useState(0)
	const { data } = useGetAllAssetsQuery(offset, { pollingInterval: 60000 })

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

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (Number(e.target.value) || Number(e.target.value) === 0) {
			setDonate(Number(e.target.value))
		}
	}
	const dispatch = useDispatch()
	const balance = useSelector((state: RootState) => state.balance.balance)

	const handleOpenModal = (item: any) => {
		setPortItem(item)
		setOpenPort(true)
		console.log('handleOpenModal')
	}

	const handleAddToPort = (item: any) => {
		if (balance > item.priceUsd * donate) {
			setToast(false)
			setMessage('Not Enough Coins')
			console.log('donate', donate, item.priceUsd * donate)
			dispatch(addToPortfolio({ ...item, donate }))
			dispatch(decreaseBalance(item.priceUsd * donate))
			setOpenPort(!openPort)
		} else {
			setToast(true)
			setTimeout(() => {
				setToast(false)
			}, 5000)
		}
	}

	const handlePaginate = (e: React.MouseEvent<HTMLDivElement>) => {
		setOffset(Number(e.currentTarget.innerText) * 100)
	}

	return (
		<div className='container mx-auto'>
			<div className='bordler-r-2 flex gap-4 mt-4'>
				<Link href='watchlist'>Watchlist</Link>
				<Link href='portfolio'>Portfolio</Link>
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

			{openPort && (
				<Modal active={openPort} setActive={setOpenPort}>
					<div>
						<p>{portItem?.name}</p>
						<p>Current Price: {Number(portItem!.priceUsd).toFixed(2)}</p>
						<div className='flex gap-1'>
							<p>Quantity: </p>
							<input value={donate} onChange={handleChange} />
						</div>
						<button
							className='border rounded-2xl border-sky-400 w-full'
							onClick={() => {
								handleAddToPort(portItem)
							}}
						>
							Add
						</button>
					</div>
				</Modal>
			)}

			{toast && <Toaster toast={toast} setToast={setToast} message={message} />}
			<div className=''>
				{data?.data?.map((item: any) => (
					<Rate key={item.id} data={item} handleOpenModal={handleOpenModal} />
				))}
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
