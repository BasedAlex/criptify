'use client'
import { RootState } from '@/store/index'

import React, { useState } from 'react'
import { DM_Mono, Montserrat } from 'next/font/google'
import { useDispatch, useSelector } from 'react-redux'
import Subheader from '../Rates/Subheader/Subheader'
import { FAVED_ITEMS } from '../../Constants'
import { TextSamples } from '../Rates/TextSamples/TextSamples'
import Column from '../UI/Column/Column'
import FixedParagraph from '../UI/FixedParagraph/FixedParagraph'
import Dropdown from '../UI/Dropdown/Dropdown'
import { Pagination } from '../UI/Pagination/Pagination'
import useSetDataToStore from '@/hooks/useSetDataToStore'
import { useGetAllAssetsQuery } from '@/store/fetchAPI/apiSlice'

const dmmono = DM_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-dm_mono',
})

const montserrat = Montserrat({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
})

const PortfolioComponent = () => {
  const port = useSelector((state: RootState) => state.portfolio)
  const dispatch = useDispatch()
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(100)
  const [dataOffset, setDataOffset] = useState(0)
  const [dataLimit, setDataLimit] = useState(5)
  const [currentPage, setCurrentPage] = useState('1')

  const { data } = useGetAllAssetsQuery(
    { limit, offset },
    {
      pollingInterval: 30000,
    }
  )

  const paginatedArr = () => {
    const arr: any[] = []
    for (let i = 0; i < dataOffset + dataLimit; i++) {
      if (!port?.portfolio[i]) {
        return arr
      }
      arr.push(port?.portfolio[i])
    }
    return arr
  }

  const portfolioArr = () => {
    const newArr = paginatedArr()
    const empty = []

    for (let i = 0; i < newArr.length; i++) {
      empty.push([
        newArr[i],
        ...data?.data?.filter((items: any) => items.id === newArr[i]?.id),
        ,
      ])
    }

    console.log('empty', empty[0] ? empty[0] : '')

    let resultObject: any = {}

    for (let i = 0; i < empty.length; i++) {
      empty[i]?.forEach(function (item: any, index: number) {
        for (let keys in item) {
          if (!resultObject.hasOwnProperty(keys)) {
            resultObject[keys] = item[keys]
          } else {
            resultObject[keys + 'new'] = item[keys]
          }
        }
      })
    }

    return resultObject
  }

  console.log(portfolioArr())

  return (
    <div>
      {' '}
      <div
        className="absolute -z-40 h-60 w-full  bg-gradient-to-r from-cyan-700 from-20% via-blue-500 via-40% to-blue-700 to-60%"
        style={{ color: '' }}
      ></div>
      <div className={`${dmmono.variable} container mx-auto pt-5`}>
        <div className="container relative z-40 w-full rounded-lg border">
          <Subheader
            setLimit={setDataLimit}
            setOffset={setDataOffset}
            items={FAVED_ITEMS}
            text={'mx-5'}
          />
        </div>

        <div className="bg-white shadow-lg">
          <div
            className={`${montserrat.className} mt-8 grid h-10 grid-cols-1n7 place-content-center items-center justify-center justify-items-center border-b	border-t`}
          >
            <p className=" place-self-center	">#</p>
            <p>Name</p>
            <p>Price</p>
            <p>24h %</p>
            <p>Current Price</p>
            <Column name={'Volume(24h)'} tooltip={TextSamples.Volume} />
            <Column name={'Supply'} tooltip={TextSamples.Circulate} />
          </div>
          <div className={montserrat.className}>
            {paginatedArr()?.map((item: any) => (
              <div
                key={item.id}
                className={`container  mx-auto grid grid-cols-1n7 items-center justify-center justify-items-center border-b  pb-2 pt-2`}
              >
                <div className="accordion-down my-auto flex items-center justify-items-center		">
                  <p className={`align-self p-3 ${dmmono.className}`}>
                    {item.rank}
                  </p>
                </div>
                <p className={dmmono.className}>{item.name}</p>
                <FixedParagraph
                  fixed={2}
                  value={item.priceUsd}
                  isTooltip={true}
                />
                <FixedParagraph fixed={2} value={item.changePercent24Hr} />
                <FixedParagraph
                  fixed={2}
                  value={item.marketCapUsd}
                  withTransform={true}
                />
                <FixedParagraph
                  fixed={2}
                  value={item.volumeUsd24Hr}
                  withTransform={true}
                />
                <FixedParagraph
                  fixed={2}
                  value={item.supply}
                  withTransform={true}
                />
                <div className="flex items-center gap-4"></div>
                <div>
                  <Dropdown title={['Add to portfolio']} />
                </div>
              </div>
            ))}
          </div>
        </div>
        {port.portfolio.length > dataLimit && (
          <Pagination
            limit={dataLimit}
            offset={dataOffset}
            maxOffset={port.portfolio.length}
            setOffset={setDataOffset}
            currentPage={currentPage}
            endless={true}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  )
}

export default PortfolioComponent
