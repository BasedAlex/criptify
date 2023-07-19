'use client'
import { RootState } from '@/store/index'
import React, { useEffect, useMemo, useState } from 'react'
import { DM_Mono, Montserrat } from 'next/font/google'
import { useDispatch, useSelector } from 'react-redux'
import Subheader from '../Rates/Subheader/Subheader'
import { FAVED_ITEMS } from '../../Constants'
import { TextSamples } from '../Rates/TextSamples/TextSamples'
import Column from '../UI/Column/Column'
import FixedParagraph from '../UI/FixedParagraph/FixedParagraph'
import Dropdown from '../UI/Dropdown/Dropdown'
import { Pagination } from '../UI/Pagination/Pagination'
import { useGetPricesQuery } from '@/store/fetchAPI/pricesSlice'

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
  const portfolio = useSelector((state: RootState) => state.portfolio.portfolio)
  const dispatch = useDispatch()
  const [dataOffset, setDataOffset] = useState(0)
  const [dataLimit, setDataLimit] = useState(5)
  const [currentPage, setCurrentPage] = useState('1')
  const [currentPrices, setCurrentPrices] = useState(null)

  // useGetPricesQuery({})

  const coin = 'bitcoinethereum'

  const data = useGetPricesQuery({ coin })

  console.log(data)

  // useEffect(() => {
  //   const pricesWs = new WebSocket(
  //     `wss://ws.coincap.io/prices?assets=${tokens}`
  //   )

  //   pricesWs.onmessage = function (msg) {
  //     // console.log('msg.data', msg.data, tokens)
  //     const data = msg.data ? JSON.parse(msg.data) : null
  //     setCurrentPrices(data)
  //   }
  // })

  const tokens = useMemo(() => {
    return portfolio.map((coin: any) => coin.id).join(',')
  }, [portfolio])

  const paginatedArr = useMemo(() => {
    const arr: any[] = []

    if (!portfolio.length) {
      return []
    }

    const len =
      portfolio.length > dataOffset + dataLimit
        ? dataOffset + dataLimit
        : portfolio.length

    for (let i = 0; i < len; i++) {
      arr.push(portfolio[i])
    }
    return arr
  }, [portfolio, dataOffset, dataLimit])

  // console.log(paginatedArr)

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
            <p>Price market</p>
            <p>24h %</p>
            <p>Current Price</p>
            <Column name={'Volume(24h)'} tooltip={TextSamples.Volume} />
            <Column name={'Supply'} tooltip={TextSamples.Circulate} />
          </div>
          <div className={montserrat.className}>
            {paginatedArr.map((item: any) => (
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
                <FixedParagraph
                  fixed={2}
                  value={
                    currentPrices
                      ? currentPrices[item.id] ?? item.priceUsd
                      : item.priceUsd
                  }
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
        {portfolio.length > dataLimit && (
          <Pagination
            limit={dataLimit}
            offset={dataOffset}
            maxOffset={portfolio.length}
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
