'use client'
import Favorite from '@/components/components/Favorite/Favorite'
import Header from '@/components/components/Header/Header'
import { useSelector } from 'react-redux'

export default function Watchlist() {
	const data = useSelector((state: any) => state.favorite)

	console.log(data)

	return (
		<>
			<Header />
			<Favorite />
		</>
	)
}
