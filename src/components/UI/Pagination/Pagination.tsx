import usePagination from '@/hooks/usePagination'
import * as React from 'react'

interface IProps {
  limit: number
  offset: number
  setOffset: (arg: number) => void
  currentPage: string
  setCurrentPage: (arg: string) => void
}

export const Pagination = (props: IProps) => {
  const { limit, offset, setOffset, currentPage, setCurrentPage } = props

  const actualPages = usePagination({ limit, currentPage })

  const handlePaginate = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.value === 'prevPage') {
      if (offset > 0) {
        setOffset(offset - limit)
        let nav = +currentPage - 1
        setCurrentPage(nav.toString())
      }
    } else if (e.currentTarget.value === 'nextPage') {
      if (offset + limit < 2200) {
        // 300 1800 300 22100
        setOffset(offset + limit)
        let nav = +currentPage + 1
        setCurrentPage(nav.toString())
      }
      return
    } else if (e.currentTarget.value !== '...') {
      setCurrentPage(e.currentTarget.value)
      setOffset((+e.currentTarget.value - 1) * limit)
    }
  }

  return (
    <div className="container mx-auto">
      <div className="my-6 flex cursor-pointer items-center justify-center pt-5 text-gray-600 lg:mt-0">
        <button
          className="rounded px-4 py-2 hover:bg-gray-100"
          value="prevPage"
          onClick={(e) => handlePaginate(e)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div className="flex gap-5 ">
          {actualPages.map((page: number | string, idx: number) => (
            <button
              className={
                page === +currentPage
                  ? 'select-none rounded px-4 py-2 text-blue-400 hover:bg-gray-100	'
                  : 'select-none rounded px-4 py-2 hover:bg-gray-100'
              }
              key={idx}
              value={page}
              onClick={(e) => {
                handlePaginate(e)
              }}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          className="rounded px-4 py-2 hover:bg-gray-100"
          value="nextPage"
          onClick={(e) => handlePaginate(e)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
