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
import Subheader from './Subheader/Subheader'
import { DM_Mono, Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
})

const dmmono = DM_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-dm_mono',
})

const Rates = () => {
  console.log(useSelector((state) => state))
  const [openPort, setOpenPort] = useState(false)
  const [toast, setToast] = useState(false)
  const [message, setMessage] = useState<string>('')
  const [portItem, setPortItem] = useState<any>({})
  const [donate, setDonate] = useState(1)
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(100)
  const maxOffset = 2000
  const { data } = useGetAllAssetsQuery(
    { offset, limit },
    {
      pollingInterval: 30000,
    }
  )
  let pages: number[] = []

  const paginate = (num = maxOffset / limit) => {
    let i = 0
    while (i < num) {
      pages.push(i)
      i++
    }
    return pages
  }

  const handleLeft = () => {
    if (offset > 0) {
      setOffset(offset - limit)
    }
  }

  const handleRight = () => {
    if (offset <= maxOffset) {
      setOffset(offset + limit)
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
      setToast(true)
      setMessage('Thanks for purchaise!')
      setTimeout(() => {
        setToast(false)
      }, 5000)
      console.log('donate', donate, item.priceUsd * donate)
      dispatch(addToPortfolio({ ...item, donate }))
      dispatch(decreaseBalance(item.priceUsd * donate))
      setOpenPort(!openPort)
    } else {
      setToast(false)
    }
  }

  const handlePaginate = (e: React.MouseEvent<HTMLDivElement>) => {
    setOffset(Number(e.currentTarget.innerText) * limit)
  }

  return (
    <div className="container mx-auto mt-16 ">
      <Subheader setLimit={setLimit} setOffset={setOffset} />
      <div
        className={`${dmmono.variable} my-4 grid grid-cols-1n6 justify-items-center rounded-sm border border-cyan-400 bg-gray-50 py-3  text-xl font-bold leading-snug`}
      >
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
            <div className="flex gap-1">
              <p>Quantity: </p>
              <input value={donate} onChange={handleChange} />
            </div>
            <button
              className="w-full rounded-2xl border border-sky-400"
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
      <div className={`${dmmono.variable} text-xl shadow-lg`}>
        {data?.data?.map((item: any) => (
          <Rate key={item.id} data={item} handleOpenModal={handleOpenModal} />
        ))}
      </div>
      <div className="container mx-auto">
        <div className="my-6 flex cursor-pointer items-center justify-center pt-5 text-gray-600 lg:mt-0">
          <div
            className="rounded px-4 py-2 hover:bg-gray-100"
            onClick={handleLeft}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
          <div className="flex gap-5 ">
            {paginate().map((page: number) => (
              <div
                className="rounded px-4 py-2 hover:bg-gray-100"
                key={page}
                onClick={(e) => handlePaginate(e)}
              >
                {page + 1}
              </div>
            ))}
          </div>
          <div
            className="rounded px-4 py-2 hover:bg-gray-100"
            onClick={handleRight}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Rates
