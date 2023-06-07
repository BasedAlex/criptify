'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Visa from '../../../public/svg/Visa'
import AmericanEx from '../../../public/svg/AmericanEx'
import MasterCard from '../../../public/svg/MasterCard'
import Mir from '../../../public/svg/Mir'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/components/store'
import { acceptPayment } from '@/components/store/slices/balanceSlice'

export type CardType = {
	'': string
	VISA: 'VISA'
	MC: 'MC'
	MIR: 'MIR'
	AE: 'AE'
}

const CardForm = () => {
	const router = useRouter()
	const [card, setCard] = useState('')
	const [date, setDate] = useState('')
	const [cvv, setCVV] = useState('')
	const [dateErr, setDateErr] = useState(false)
	const [cardErr, setCardErr] = useState(false)
	const [cvvErr, setCVVErr] = useState(false)
	const [typeCard, setTypeCard] = useState<keyof CardType>('')
	const buyoutbalance = useSelector((state: RootState) => state.balance)
	console.log(buyoutbalance)

	const dispatch = useDispatch()

	const cardNumberBeutify = (value: string | null) => {
		const temp = value
			?.match(/\d{4}|\d+/g)
			?.reduce((acc: string, el: string) => {
				if (el.length === 4) {
					return acc + el + ' '
				}

				return acc + el
			}, '')

		return temp
	}

	const dateBeautify = (value: string | null) => {
		const temp = value?.match(/\d{2}|\d+/g)?.join('/')
		return temp
	}

	const cardValidation = () => {
		const cardTotal = card.replaceAll(' ', '')
		if (cardTotal.length != 16) {
			setCardErr(true)
		}
	}

	const dateValidation = () => {
		const tempExpMonth = date[0] + date[1]
		const expMonth =
			tempExpMonth[0] === '0' ? Number(date[1]) : Number(tempExpMonth)

		const expYear = Number(date[3] + date[4])
		const curDate = new Date()
		const curMonth = curDate.getMonth() + 1
		const curYear = curDate.getFullYear() - 2000

		if (curYear >= expYear && curMonth > expMonth) {
			return setDateErr(true)
		}
		if (curYear > expYear) {
			return setDateErr(true)
		}
		if (expMonth > 12) {
			return setDateErr(true)
		}
		if (date.length != 5) {
			return setDateErr(true)
		}
	}

	const cvvValidation = () => {
		if (cvv.length !== 3) {
			setCVVErr(true)
		}
	}

	const handleDate = (e: React.FormEvent<HTMLInputElement>) => {
		const regex = /^\d+$/gim
		const value = e.currentTarget.value.replace(/\//g, '')
		if (regex.test(value) && value.length <= 4) {
			const temp = dateBeautify(value)
			setDate(temp ?? '')
			setDateErr(false)
		}
		if (!value) {
			setDate('')
		}
	}

	const handleCVV = (e: React.FormEvent<HTMLInputElement>) => {
		const regex = /^\d+$/gim
		const value = e.currentTarget.value

		if (regex.test(value) && value.length <= 3) {
			setCVV(value ?? '')
			setCVVErr(false)
		}
		if (!value) {
			setCVV('')
		}
	}

	const getTypeCard = (char: string) => {
		switch (char) {
			case '2':
				return 'MIR'
			case '3':
				return 'AE'
			case '4':
				return 'VISA'
			case '5':
				return 'MC'
			default:
				return ''
		}
	}

	const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
		const regex = /^\d+$/gim
		const value = e.currentTarget.value.replace(/\s/g, '')
		if (regex.test(value) && value.length <= 16) {
			const temp = cardNumberBeutify(value)
			const typeCard = getTypeCard(temp![0])
			setCard(temp?.trim() ?? '')
			setCardErr(false)
			setTypeCard(typeCard)
		}

		if (!value) {
			setCard('')
			setTypeCard('')
		}
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		if (
			card.length &&
			date.length &&
			dateErr === false &&
			cvv.length &&
			cvvErr === false &&
			cardErr === false
		) {
			dispatch(acceptPayment())
			alert(`Спасибо за покупку! Вы будете перенаправлены на главную страницу.`)
			e.preventDefault()
			router.push('/')
		} else {
			alert(`Во время покупки произошла ошибка, проверьте введённые данные`)
		}
	}

	return (
		<form
			className='container mx-auto justify-self-center mt-8'
			onSubmit={e => handleSubmit(e)}
		>
			<div className='mx-2 h-60 w-96 border border-black rounded-lg p-5 z-30 absolute bg-white shadow-lg'>
				<div className='flex gap-2 '>
					<span className='text-lg pt-2'>Номер карты</span>
					<Visa typeCard={typeCard} />
					<MasterCard typeCard={typeCard} />
					<AmericanEx typeCard={typeCard} />
					<Mir typeCard={typeCard} />
				</div>

				<input
					value={card}
					className='border text-3xl  border-black mt-1 w-80 h-10'
					style={{ borderColor: cardErr ? 'red' : 'black' }}
					onChange={e => handleInput(e)}
					onBlur={() => cardValidation()}
				/>
				<div className='flex items-end gap-2 justify-between mt-12'>
					<span className='uppercase text-lg w-12'>Срок действия</span>
					<div className='flex flex-col'>
						<span className='uppercase text-sm'>месяц/год</span>
						<input
							className='w-20 text-lg pl-4 self-end border border-black	'
							style={{ borderColor: dateErr ? 'red' : 'black' }}
							value={date}
							onChange={e => handleDate(e)}
							onBlur={() => dateValidation()}
						/>
					</div>
				</div>
			</div>
			<div className='mx-2 -mt-2 ml-32 h-60 w-96 border z-10 absolute border-black rounded-lg p-5 bg-white shadow-md'>
				<div className='w-96 mt-2 -ml-5  h-10 bg-black'></div>
				<div className='flex flex-col'>
					<span className='uppercase text-sm self-end w-20 pt-10'>
						CVV / CVC
					</span>
					<input
						className='w-20 self-end border border-black	'
						style={{ borderColor: cvvErr ? 'red' : 'black' }}
						value={cvv}
						onBlur={cvvValidation}
						onChange={e => handleCVV(e)}
					/>
					<span className='text-sm leading-3 self-end w-20 text-gray-500 pt-1'>
						Последние три цифры на обороте
					</span>
				</div>
			</div>
			<button className='uppercase bg-red-500 text-white p-2 rounded mt-72 ml-60'>
				оплатить
			</button>
		</form>
	)
}

export default CardForm
