'use client'
import { removeFromFav } from '@/store/slices/initialSlice'
import { removeItemFromPortfolio } from '@/store/slices/portfolioSlice'
import { useDispatch, useSelector } from 'react-redux'
import ToolTip from '../UI/ToolTip/ToolTip'
import AlertCircle from '../../../public/svg/AlertCircle'
import { TextSamples } from '../Rates/TextSamples/TextSamples'

const Favorite = () => {
  const data = useSelector((state: any) => state.favorite)
  const dispatch = useDispatch()

  const handleRemove = (data: any) => {
    dispatch(removeFromFav(data))
  }
  const handleRemoveOne = (data: any) => {
    dispatch(removeItemFromPortfolio(data))
  }

  console.log(data.favorite)

  return data.favorite.length ? (
    <div className="mt-2">
      <div className="container mx-auto grid grid-cols-1n6 items-center">
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
      {data.favorite.map((item: any) => (
        <div
          key={item.id}
          className="container mx-auto grid grid-cols-1n6 items-center"
        >
          <p>{item.rank}</p>
          <p>{item.name}</p>
          <p>{Number(item.priceUsd).toFixed(6)}</p>
          <p>{Number(item.changePercent24Hr).toFixed(6)}</p>
          <p>{Number(item.marketCapUsd).toFixed(6)}</p>
          <p>{Number(item.volumeUsd24Hr).toFixed(6)}</p>
          <p>{Number(item.supply).toFixed(6)}</p>
          <div className="flex gap-4">
            <button className="w-full rounded-2xl	 border border-sky-400">
              Add More
            </button>
            <button
              className="w-full rounded-2xl border border-sky-400"
              onClick={() => {
                handleRemoveOne(item)
              }}
            >
              Sell One
            </button>
            <button
              className="w-full rounded-2xl border border-sky-400"
              onClick={() => {
                handleRemove(item)
              }}
            >
              Sell All
            </button>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="flex justify-center">
      <div>No items! Start by adding your favorite coins!</div>
    </div>
  )
}

export default Favorite
