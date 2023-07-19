import { createEntityAdapter } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Error from 'next/error'
// import WebSocket from 'ws'

// const socket = new WebSocket('wss://ws.coincap.io/')

const URL = `wss://ws.coincap.io/prices?assets=bitcoin`

const pricesAdapter = createEntityAdapter()

// export const pricesApi = createApi({
//   reducerPath: 'pricesApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: `/`,
//   }),
//   endpoints: (build) => ({
//     getPrices: build.query({
//       query: (coin) => `prices?assets=${coin}`,
//       transformResponse(response: any) {
//         return pricesAdapter.addMany(pricesAdapter.getInitialState(), response)
//       },
//       async onCacheEntryAdded(
//         arg,
//         { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
//       ) {
//         const ws = new WebSocket(`${URL}/prices?assets=${arg.coin}`)

//         console.log('arg,', arg)
//         try {
//           await cacheDataLoaded
//           console.log('arg2,', arg)
//           const listener = (event: any) => {
//             console.log('data', event.data)
//             const data = JSON.parse(event)
//             if (data.coin !== arg) return
//             updateCachedData((draft) => {
//               pricesAdapter.upsertOne(draft, data)
//             })
//           }
//           ws.addEventListener('message', listener)
//         } catch {
//           console.error(Error)
//         }
//         await cacheEntryRemoved
//         ws.close()
//       },
//     }),
//   }),
// })

const socket = new WebSocket(URL)

const waitForSocketConnection = (socket: any) =>
  new Promise((resolve) => {
    if (socket.readyState === WebSocket.OPEN) {
      resolve()
    } else {
      socket.onopen = resolve
    }
  })

export const pricesApi = createApi({
  reducerPath: 'pricesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `/`,
  }),
  endpoints: (build) => ({
    getPrices: build.query({
      query: (coin) => `prices?assets=${coin}`,
      transformResponse(response: any) {
        return pricesAdapter.addMany(pricesAdapter.getInitialState(), response)
      },
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        waitForSocketConnection(socket).then(() => {
          const listener = (event: any) => {
            console.log('data', event)
            const data = JSON.parse(event.data)
            // if (data.coin !== arg) return
            updateCachedData((draft) => {
              console.log('draft', draft)
              pricesAdapter.upsertOne(draft, data)
            })
          }
          socket.addEventListener('message', listener)
        })

        await cacheDataLoaded

        await cacheEntryRemoved
        socket.close()
      },
    }),
  }),
})

export const { useGetPricesQuery } = pricesApi
