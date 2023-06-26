export const CurrentInfo = () => {
  return (
    <div className="absolute -z-40 h-60 w-full bg-gradient-to-r from-indigo-500 from-10% via-sky-600 via-40% to-cyan-700 to-60% ">
      <div className="container mx-auto flex items-center justify-between py-5 font-semibold text-white">
        <div className="text-center">
          <p>MARKET CAP</p>
          <p>$298.29T</p>
        </div>
        <div className="text-center">
          <p>EXCHANGE VOL</p>
          <p>$5.27T</p>
        </div>
        <div className="text-center">
          <p>ASSETS</p>
          <p>2,296</p>
        </div>
        <div className="text-center">
          <p>EXCHANGES</p>
          <p>73</p>
        </div>
        <div className="text-center">
          <p>MARKETS</p>
          <p>11,370</p>
        </div>
        <div className="text-center">
          <p>BTC DOM INDEX</p>
          <p>50.3%</p>
        </div>
      </div>
    </div>
  )
}
