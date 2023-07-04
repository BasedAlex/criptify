'use client'
import { removeFromFav } from '@/store/slices/initialSlice'
import { removeItemFromPortfolio } from '@/store/slices/portfolioSlice'
import { useDispatch, useSelector } from 'react-redux'
import ToolTip from '../UI/ToolTip/ToolTip'
import AlertCircle from '../../../public/svg/AlertCircle'
import { TextSamples } from '../Rates/TextSamples/TextSamples'
import Subheader from '../Rates/Subheader/Subheader'
import { useState } from 'react'
import Link from 'next/link'
import Remove from '../../../public/svg/Remove'
import Minus from '../../../public/svg/Minus'
import Plus from '../../../public/svg/Plus'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../UI/Dropbox/Dropbox'
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { DM_Mono, Montserrat } from 'next/font/google'
import { transform } from '../../lib/transform'

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
  const dispatch = useDispatch()
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(100)

  // const handleRemove = (data: any) => {
  //   dispatch(removeFromFav(data))
  // }
  // const handleRemoveOne = (data: any) => {
  //   dispatch(removeItemFromPortfolio(data))
  // }

  const items = ['5', '10', '25']
  console.log(data.favorite)

  return data.favorite.length ? (
    <div className={`${dmmono.variable} container mx-auto mt-5`}>
      <div className="container -z-40  w-full rounded-lg border bg-gradient-to-r from-indigo-500 from-10% via-sky-600 via-40% to-cyan-700 to-60%">
        <Subheader
          setLimit={setLimit}
          setOffset={setOffset}
          items={items}
          text={'mx-5'}
        />
      </div>
      <div className="mb-2 items-center justify-between"></div>
      <div
        className={`${montserrat.className} mt-8 grid grid-cols-1n7 items-center justify-center justify-items-center border-b border-t`}
      >
        <p className="">#</p>
        <p>Name</p>
        <p>Price</p>
        <p>24h %</p>
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
      <div className={montserrat.className}>
        {data.favorite.map((item: any) => (
          <div
            key={item.id}
            className={`container mx-auto grid grid-cols-1n7 items-center justify-center justify-items-center border-b  pb-2 pt-2`}
          >
            <p className={dmmono.className}>{item.rank}</p>
            <p className={dmmono.className}>{item.name}</p>
            <p className={montserrat.className}>
              {Number(item.priceUsd).toFixed(2)}
            </p>
            <p className={montserrat.className}>
              {Number(item.changePercent24Hr).toFixed(2)}
            </p>
            <p className={montserrat.className}>
              {transform(Number(item.marketCapUsd))}
            </p>
            <p className={montserrat.className}>
              {Number(item.volumeUsd24Hr).toFixed(2)}
            </p>
            <p className={montserrat.className}>
              {Number(item.supply).toFixed(2)}
            </p>
            <div className="flex items-center gap-4"></div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <DotsVerticalIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </div>
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
