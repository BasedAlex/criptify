import { useEffect, useState } from 'react'

interface IProps {
  limit: number
  offset: number
  setOffset: (arg: number) => void
  currentPage: string
  setCurrentPage: (arg: string) => void
}

export const TestPagination = (props: IProps) => {
  const { limit, offset, setOffset, currentPage, setCurrentPage } = props

  let actualPages: any = []

  const maxOffset = 2000
  let totalPages: any[] = []

  const handleLeft = () => {
    if (offset > 0) {
      setOffset(offset - limit)
      setCurrentPage(currentPage)
    }
  }

  const handleRight = () => {
    if (offset <= maxOffset) {
      setOffset(offset + limit)
      setCurrentPage(currentPage)
    }
  }

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
      console.log(actualPages)
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
      console.log('third one!', actualPages)
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
      console.log('this one!', actualPages)
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
  // useEffect(() => {}, [handleLeft, handleRight, currentPage, paginate])

  const handlePaginate = (e: any) => {
    if (e.target.value !== 'prevPage' && e.target.value !== 'nextPage') {
      setCurrentPage(e.target.value)
      setOffset((+e.target.value - 1) * limit)
    } else if (e.currentTarget.value === 'prevPage') {
      if (offset > 0) {
        let nav = +currentPage - 1
        setCurrentPage(nav.toString())
        setOffset(offset - limit)
      }
    } else if (e.currentTarget.value === 'nextPage') {
      if (offset > 0) {
        setOffset(offset - limit)
        let nav = +currentPage + 1
        setCurrentPage(nav.toString())
      }
    }
    console.log(e.currentTarget.value)
  }

  console.log('current', currentPage)

  return (
    <div className="container mx-auto">
      <div className="my-6 flex cursor-pointer items-center justify-center pt-5 text-gray-600 lg:mt-0">
        <button
          className="rounded px-4 py-2 hover:bg-gray-100"
          // // onClick={handleLeft}
          // id="prevPage"
          // value="prevPage"
          // onClick={(e: any) => handlePaginate(e)}
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
          {paginate().map((page: number, idx: number) => (
            <button
              className={
                page === +currentPage
                  ? 'select-none rounded px-4 py-2 text-blue-400 hover:bg-gray-100	'
                  : 'select-none rounded px-4 py-2 hover:bg-gray-100'
              }
              key={idx}
              value={page}
              onClick={(e: any) => handlePaginate(e)}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          className="rounded px-4 py-2 hover:bg-gray-100"
          // value="nextPage"
          // onClick={(e: any) => handlePaginate(e)}
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
