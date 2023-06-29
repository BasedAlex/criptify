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
  let actualPages: Array<string | number> = []
  const maxOffset = 2000
  let totalPages: number[] = []
  let i = 1
  while (i <= maxOffset / limit) {
    totalPages.push(i)
    i++
  }

  let isValid = totalPages.length > 7 && currentPage !== '...'
  const paginate = () => {
    if (isValid && +currentPage === 1) {
      actualPages = totalPages.slice(0, 5)
      actualPages = [
        +currentPage,
        +currentPage + 1,
        +currentPage + 2,
        +currentPage + 3,
        '...',
        totalPages.length,
      ]
      setCurrentPage(currentPage)
    } else if (isValid && +currentPage > 1 && +currentPage === 2) {
      actualPages = [
        +currentPage - 1,
        +currentPage,
        +currentPage + 1,
        +currentPage + 2,
        '...',
        totalPages.length,
      ]
      setCurrentPage(currentPage)
    } else if (isValid && +currentPage > 1 && +currentPage === 3) {
      actualPages = [
        +currentPage - 2,
        +currentPage - 1,
        +currentPage,
        +currentPage + 1,
        '...',
        totalPages.length,
      ]
      setCurrentPage(currentPage)
    } else if (
      isValid &&
      +currentPage > 3 &&
      +currentPage < totalPages.length - 2
    ) {
      actualPages = [
        1,
        '...',
        +currentPage - 1,
        +currentPage,
        +currentPage + 1,
        '...',
        totalPages.length,
      ]
      setCurrentPage(currentPage)
    } else if (
      isValid &&
      +currentPage > totalPages.length - 3 &&
      +currentPage < totalPages.length - 1
    ) {
      actualPages = [
        1,
        '...',
        +currentPage - 1,
        +currentPage,
        +currentPage + 1,
        totalPages.length,
      ]

      setCurrentPage(currentPage)
    } else if (isValid && +currentPage === totalPages.length) {
      actualPages = [
        1,
        '...',
        +currentPage - 3,
        +currentPage - 2,
        +currentPage - 1,
        +currentPage,
      ]

      setCurrentPage(currentPage)
    } else if (isValid && +currentPage === totalPages.length - 1) {
      actualPages = [
        1,
        '...',
        +currentPage - 2,
        +currentPage - 1,
        +currentPage,
        +currentPage + 1,
      ]

      setCurrentPage(currentPage)
    }

    return actualPages
  }

  const handlePaginate = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.value === 'prevPage') {
      if (offset > 0) {
        setOffset(offset - limit)
        let nav = +currentPage - 1
        setCurrentPage(nav.toString())
      }
    } else if (e.currentTarget.value === 'nextPage') {
      if (offset <= maxOffset) {
        setOffset(offset + limit)
        let nav = +currentPage + 1
        setCurrentPage(nav.toString())
      }
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
          {paginate().map((page: number | string, idx: number) => (
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
