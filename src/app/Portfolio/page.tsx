'use client'
import Header from '@/components/components/Header/Header'
import { useSelector } from 'react-redux'
import PortfolioComponent from '../../components/Portfolio/PortfolioComponent'

export default function Portfolio() {
	return (
		<>
			<Header />
			<PortfolioComponent />
		</>
	)
}
