import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Error from 'next/error'
// import WebSocket from 'ws'

const socket = new WebSocket(
  'wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin'
)

export const pricesApi = createApi({
  reducerPath: 'pricesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `/`,
  }),
  endpoints: (build) => ({
    getPrices: build.query({
      query: () => ``,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const ws = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin')
        try {
          await cacheDataLoaded
          const listener = (event: any) => {
            const data = JSON.parse(event.data)
            updateCachedData((draft) => {
              draft.push(data)
            })
          }

          ws.addEventListener('message', listener)
        } catch {
          console.error(Error)
        }
        await cacheEntryRemoved

        ws.close()
      },
    }),
  }),
})

export const { useGetPricesQuery } = pricesApi
