'use client'
import { useDispatch, useSelector } from 'react-redux'
import ToolTip from '../../UI/ToolTip/ToolTip'
import { addToFav, removeFromFav } from '@/store/slices/initialSlice'
import Star from '../../../../public/svg/Star'
import { RootState } from '@/store/index'
import { transform } from '../../../lib/transform'
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

const Rate = ({ data, handleOpenModal }: any): any => {
  const faved = useSelector((state: any) => state.favorite.favorite)
  const dispatch = useDispatch()

  const find = (id: string) => {
    for (let i = 0; i < faved.length; i++) {
      if (faved[i].id === id) {
        return true
      }
    }
    return false
  }

  const handleAddToFav = (data: any) => {
    find(data.id) ? dispatch(removeFromFav(data)) : dispatch(addToFav(data))
  }

  return (
    <div className="last:border-5 mx-auto grid grid-cols-1n6 items-center justify-center justify-items-center border-b border-cyan-400 bg-white py-3  font-normal first:rounded-l-sm first:rounded-r-sm first:border-l-0 first:border-r-0 last:border-0 hover:bg-gray-200 ">
      <div
        className="my-auto flex items-center justify-items-center"
        onClick={() => handleAddToFav(data)}
      >
        <div className="pb-3 pl-3 pr-0 pt-3">
          <Star color={find(data.id) ? '#000' : '#fff'} />
        </div>
        <p className="align-self p-3">{data.rank}</p>
      </div>

      <p className="font-serif">{data.name}</p>
      <ToolTip classname={montserrat.className} tooltip={data.priceUsd}>
        {Number(data.priceUsd).toFixed(2)}
      </ToolTip>
      <p
        className={
          Number(data.changePercent24Hr) > 0
            ? ' text-green-500'
            : 'text-red-500'
        }
      >
        {Number(data.changePercent24Hr).toFixed(2)}
      </p>
      <p className={montserrat.className}>
        {transform(Number(data.marketCapUsd))}
      </p>
      <p className={montserrat.className}>
        {transform(Number(data.volumeUsd24Hr))}
      </p>
      <p className={montserrat.className}>{transform(Number(data.supply))}</p>
      <div className="flex gap-4">
        <button
          className="invisible w-full rounded-2xl border border-sky-400 font-serif	font-normal"
          onClick={() => handleOpenModal(data)}
        >
          Add to portfolio
        </button>
      </div>
    </div>
  )
}

export default Rate
