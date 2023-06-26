'use client'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const assetsApi = createApi({
  reducerPath: 'assetsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coincap.io/v2' }),
  endpoints: (build) => ({
    getAllAssets: build.query({
      query: (args) => {
        const { offset, limit } = args
        return {
          url: `/assets?limit=${limit}&offset=${offset}`,
        }
      },
    }),
    getAsset: build.query({
      query: (asset) => `assets/${asset}`,
    }),
  }),
})

export const { useGetAllAssetsQuery, useGetAssetQuery } = assetsApi
