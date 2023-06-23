"use client";
import { removeFromFav } from "@/store/slices/initialSlice";
import { removeItemFromPortfolio } from "@/store/slices/portfolioSlice";
import { useDispatch, useSelector } from "react-redux";

const Favorite = () => {
  const data = useSelector((state: any) => state.favorite);
  const dispatch = useDispatch();

  const handleRemove = (data: any) => {
    dispatch(removeFromFav(data));
  };
  const handleRemoveOne = (data: any) => {
    dispatch(removeItemFromPortfolio(data));
  };

  console.log(data);

  return data.favorite.map((item: any) => (
    <div key={item.id} className="grid grid-cols-1n6">
      <p className="">{item.rank}</p>
      <p>{item.name}</p>
      <p>{Number(item.priceUsd).toFixed(6)}</p>
      <p>{Number(item.changePercent24Hr).toFixed(6)}</p>
      <p>{Number(item.marketCapUsd).toFixed(6)}</p>
      <p>{Number(item.volumeUsd24Hr).toFixed(6)}</p>
      <p>{Number(item.supply).toFixed(6)}</p>
      <div className="flex gap-4">
        <button className="border rounded-2xl	 border-sky-400 w-full">
          Add More
        </button>
        <button
          className="border rounded-2xl border-sky-400 w-full"
          onClick={() => {
            handleRemoveOne(item);
          }}>
          Sell One
        </button>
        <button
          className="border rounded-2xl border-sky-400 w-full"
          onClick={() => {
            handleRemove(item);
          }}>
          Sell All
        </button>
      </div>
    </div>
  ));
};

export default Favorite;
