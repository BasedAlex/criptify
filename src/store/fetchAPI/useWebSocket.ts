import React from 'react'

const useWebSocket = () => {
  const pricesWs = new WebSocket(
    'wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin'
  )

  return
}

export default useWebSocket
