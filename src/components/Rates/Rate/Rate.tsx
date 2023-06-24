'use client'
import { useDispatch, useSelector } from 'react-redux'
import ToolTip from '../../UI/ToolTip/ToolTip'
import { addToFav, removeFromFav } from '@/store/slices/initialSlice'
import Star from '../../../../public/svg/Star'
import { RootState } from '@/store/index'

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
    <div className="mx-auto grid grid-cols-2n6 items-center justify-center rounded-md border-cyan-400  py-3 pr-10 font-semibold hover:bg-gray-200">
      <div
        className="my-auto flex items-center pl-3"
        onClick={() => handleAddToFav(data)}
      >
        <Star color={find(data.id) ? '#000' : '#fff'} />
      </div>
      <p className="align-self">{data.rank}</p>

      <p>{data.name}</p>
      <ToolTip tooltip={data.priceUsd}>
        {Number(data.priceUsd).toFixed(2)}
      </ToolTip>
      <p className="self-center">{Number(data.changePercent24Hr).toFixed(2)}</p>
      <p>{Number(data.marketCapUsd).toFixed(2)}</p>
      <p>{Number(data.volumeUsd24Hr).toFixed(2)}</p>
      <p>{Number(data.supply).toFixed(2)}</p>
      <div className="flex gap-4">
        <button
          className="w-full rounded-2xl border border-sky-400 font-normal"
          onClick={() => handleOpenModal(data)}
        >
          Add to portfolio
        </button>
      </div>
    </div>
  )
}

export default Rate
