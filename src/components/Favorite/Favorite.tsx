'use client'
import { addToFav, removeFromFav } from '@/store/slices/initialSlice'
import { useDispatch, useSelector } from 'react-redux'
import ToolTip from '../UI/ToolTip/ToolTip'
import AlertCircle from '../../../public/svg/AlertCircle'
import { TextSamples } from '../Rates/TextSamples/TextSamples'
import Subheader from '../Rates/Subheader/Subheader'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { DM_Mono, Montserrat } from 'next/font/google'
import Star from '../../../public/svg/Star'
import { Pagination } from '../UI/Pagination/Pagination'
import useSetDataToStore from '@/hooks/useSetDataToStore'
import FixedParagraph from '../UI/FixedParagraph/FixedParagraph'
import { FAVED_ITEMS } from '../../Constants'
import Dropdown from '../UI/Dropdown/Dropdown'

const montserrat = Montserrat({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
})

const dmmono = DM_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-dm_mono',
})

const Favorite = () => {
  const data = useSelector((state: any) => state.favorite)
  const faved = useSelector((state: any) => state.favorite.favorite)
  const dispatch = useDispatch()
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(5)
  const [currentPage, setCurrentPage] = useState('1')

  const setData = useSetDataToStore({
    data: faved,
    dispatch,
    actionToRemove: removeFromFav,
    actionToAdd: addToFav,
  })

  const paginatedArr = () => {
    const arr: number[] = []
    for (let i = 0; i < offset + limit; i++) {
      if (!data?.favorite[i]) {
        return arr
      }
      arr.push(data?.favorite[i])
    }
    return arr
  }

  return data.favorite.length ? (
    <>
      <div className="absolute -z-40 h-60 w-full  bg-gradient-to-r from-cyan-700 from-20% via-blue-500 via-40% to-blue-700 to-60%"></div>
      <div className={`${dmmono.variable} container mx-auto mt-5`}>
        <div className="container relative z-40  w-full rounded-lg border">
          <Subheader
            setLimit={setLimit}
            setOffset={setOffset}
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
            <span className="flex items-center">
              <p>Market Cap</p>
              <ToolTip tooltip={TextSamples.MarketCap}>
                <div className="cursor-default px-2">
                  <AlertCircle />
                </div>
              </ToolTip>
            </span>
            <span className="flex items-center">
              <p>Volume(24h)</p>
              <ToolTip tooltip={TextSamples.Volume}>
                <div className="cursor-default px-2">
                  <AlertCircle />
                </div>
              </ToolTip>
            </span>
            <span className="flex items-center">
              <p>Supply</p>
              <ToolTip tooltip={TextSamples.Circulate}>
                <div className="cursor-default px-2">
                  <AlertCircle />
                </div>
              </ToolTip>
            </span>
          </div>
          <div className={montserrat.className}>
            {paginatedArr()?.map((item: any) => (
              <motion.div
                key={item.id}
                className={`container  mx-auto grid grid-cols-1n7 items-center justify-center justify-items-center border-b  pb-2 pt-2`}
              >
                <div
                  className="accordion-down my-auto flex items-center justify-items-center		"
                  onClick={() => setData(item)}
                >
                  <div className="pb-3 pl-3 pr-0 pt-3">
                    <Star
                      color={
                        faved.find((fav: any) => fav.id === item.id)
                          ? '#000'
                          : '#fff'
                      }
                    />
                  </div>
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
                  <Dropdown />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        {faved.length > limit && (
          <Pagination
            limit={limit}
            offset={offset}
            maxOffset={faved.length}
            setOffset={setOffset}
            currentPage={currentPage}
            endless={true}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </>
  ) : (
    <div className="my-5 flex justify-center">
      <div>
        No items! Start by adding your favorite coins from the
        <Link href="/" className="text-blue-500 hover:text-blue-800">
          {' '}
          main page!
        </Link>
      </div>
    </div>
  )
}

export default Favorite
