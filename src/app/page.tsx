'use client'
import { CurrentInfo } from '@/components/CurrentInfo/CurrentInfo'
import Header from '../components/Header/Header'
import Rates from '../components/Rates/Rates'

export default function Home() {
  return (
    <>
      <Header />
      <CurrentInfo />
      <Rates />
    </>
  )
}
