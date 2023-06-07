import { RootState } from '@/components/store'
import { increaseBuyoutBalance } from '@/components/store/slices/balanceSlice'
import Link from 'next/link'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Donation = () => {
	const balance = useSelector((state: RootState) => state.balance.balance)
	const [donate, setDonate] = useState(0)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (Number(e.target.value) || Number(e.target.value) == 0) {
			setDonate(Number(e.target.value))
		}
	}

	const dispatch = useDispatch()
	const handleBuy = () => {
		dispatch(increaseBuyoutBalance(donate))
	}

	return (
		<div className='p-4'>
			<p>Your Current Balance: {balance}</p>
			<div className='flex flex-cols gap-3'>
				<input
					placeholder='$'
					className='border rounded-lg border-black'
					value={donate}
					onChange={e => {
						handleChange(e)
					}}
				/>
				<Link
					className='border border-cyan-400 rounded-lg p-2'
					href='/buyout'
					onClick={handleBuy}
				>
					Buy
				</Link>
			</div>
		</div>
	)
}

export default Donation
