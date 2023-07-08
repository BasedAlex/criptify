export default function usePagination({
  limit,
  currentPage,
  maxOffset,
}: {
  limit: number
  currentPage: string
  maxOffset?: number
}) {
  let totalPages: number[] = []
  let i = 1
  while (i <= Math.ceil((maxOffset ? maxOffset : 2200) / limit)) {
    totalPages.push(i)
    i++
  }

  let isValid = totalPages.length > 7 && currentPage !== '...'

  const paginate = () => {
    let actualPages: Array<string | number> = []
    if (isValid) {
      if (+currentPage === 1) {
        actualPages = totalPages.slice(0, 5)
        actualPages = [
          +currentPage,
          +currentPage + 1,
          +currentPage + 2,
          +currentPage + 3,
          '...',
          totalPages.length,
        ]
      } else if (+currentPage > 1 && +currentPage === 2) {
        actualPages = [
          +currentPage - 1,
          +currentPage,
          +currentPage + 1,
          +currentPage + 2,
          '...',
          totalPages.length,
        ]
      } else if (+currentPage > 1 && +currentPage === 3) {
        actualPages = [
          +currentPage - 2,
          +currentPage - 1,
          +currentPage,
          +currentPage + 1,
          '...',
          totalPages.length,
        ]
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
      } else if (
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
      } else if (+currentPage === totalPages.length) {
        actualPages = [
          1,
          '...',
          +currentPage - 3,
          +currentPage - 2,
          +currentPage - 1,
          +currentPage,
        ]
      } else if (+currentPage === totalPages.length - 1) {
        actualPages = [
          1,
          '...',
          +currentPage - 2,
          +currentPage - 1,
          +currentPage,
          +currentPage + 1,
        ]
      }
    } else {
      actualPages = totalPages
    }

    return actualPages
  }

  return paginate()
}
