'use client'
import React, { useEffect, useState } from 'react'
import { useGetAllAssetsQuery } from '../../store/fetchAPI/apiSlice'
import Rate from './Rate/Rate'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../UI/Modal/Modal'
import Toaster from '../UI/Toaster/Toaster'
import { addToPortfolio } from '@/store/slices/portfolioSlice'
import { RootState } from '@/store/index'
import { decreaseBalance } from '@/store/slices/balanceSlice'
import Subheader from './Subheader/Subheader'
import { DM_Mono } from 'next/font/google'
import { Pagination } from '../UI/Pagination/Pagination'
import AlertCircle from '../../../public/svg/AlertCircle'
import ToolTip from '../UI/ToolTip/ToolTip'
import { TextSamples } from './TextSamples/TextSamples'

const dmmono = DM_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-dm_mono',
})

const Rates = () => {
  const [openPort, setOpenPort] = useState(false)
  const [toast, setToast] = useState(false)
  const [message, setMessage] = useState<string>('')
  const [portItem, setPortItem] = useState<any>({})
  const [donate, setDonate] = useState(1)
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(100)
  const [currentPage, setCurrentPage] = useState('1')

  const items = ['25', '50', '100']

  const { data } = useGetAllAssetsQuery(
    { offset, limit },
    {
      pollingInterval: 30000,
    }
  )

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

  return (
    <div className="container mx-auto mt-16 ">
      <Subheader setLimit={setLimit} setOffset={setOffset} items={items} />
      <div
        className={`${dmmono.variable} my-4 grid cursor-pointer grid-cols-1n6 items-center justify-items-center rounded-sm border border-cyan-400 bg-gray-50  py-3 text-xl font-bold leading-snug`}
      >
        <p>#</p>
        <p>Name</p>
        <p>Price </p>
        <p>24h%</p>
        <span className="flex items-center">
          <p>Market Cap</p>
          <ToolTip tooltip={TextSamples.MarketCap}>
            <div className="cursor-default p-2">
              <AlertCircle />
            </div>
          </ToolTip>
        </span>
        <span className="flex items-center">
          <p>Volume(24h)</p>
          <ToolTip tooltip={TextSamples.Volume}>
            <div className="cursor-default p-2">
              <AlertCircle />
            </div>
          </ToolTip>
        </span>
        <span className="flex items-center">
          <p>Supply</p>
          <ToolTip tooltip={TextSamples.Circulate}>
            <div className="cursor-default p-2">
              <AlertCircle />
            </div>
          </ToolTip>
        </span>
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
      <Pagination
        limit={limit}
        offset={offset}
        setOffset={setOffset}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}

export default Rates
