export const Pagination = (props: any) => {
  const { limit, offset, setOffset } = props
  const maxOffset = 2000
  let pages: number[] = []

  const paginate = (num = maxOffset / limit) => {
    let i = 0
    while (i < num) {
      pages.push(i)
      i++
    }
    return pages
  }

  const handleLeft = () => {
    if (offset > 0) {
      setOffset(offset - limit)
    }
  }

  const handleRight = () => {
    if (offset <= maxOffset) {
      setOffset(offset + limit)
    }
  }

  const handlePaginate = (e: React.MouseEvent<HTMLDivElement>) => {
    setOffset(Number(e.currentTarget.innerText) * limit)
  }

  return (
    <div className="container mx-auto">
      <div className="my-6 flex cursor-pointer items-center justify-center pt-5 text-gray-600 lg:mt-0">
        <div
          className="rounded px-4 py-2 hover:bg-gray-100"
          onClick={handleLeft}
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
        </div>
        <div className="flex gap-5 ">
          {paginate().map((page: number) => (
            <div
              className="rounded px-4 py-2 hover:bg-gray-100"
              key={page}
              onClick={(e) => handlePaginate(e)}
            >
              {page + 1}
            </div>
          ))}
        </div>
        <div
          className="rounded px-4 py-2 hover:bg-gray-100"
          onClick={handleRight}
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
        </div>
      </div>
    </div>
  )
}
