import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/UI/Select/Select'
import Link from 'next/link'
import type { FC } from 'react'

interface SubheaderProps {
  setLimit: (limit: number) => void
}

const Subheader: FC<SubheaderProps> = ({ setLimit }) => {
  return (
    <div className="flex justify-between  gap-4 pt-4 text-white">
      <div>
        <Link
          href="watchlist"
          className="hover:text-semibold rounded-sm border-0 px-2 hover:bg-cyan-600 "
        >
          Watchlist
        </Link>
        <Link
          href="portfolio"
          className="hover:text-semibold rounded-sm border-0 px-2 hover:bg-cyan-600 "
        >
          Portfolio
        </Link>
      </div>
      <Select onValueChange={(value) => setLimit(Number(value))}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Items on page" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="50">50</SelectItem>
          <SelectItem value="100">100</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
export default Subheader
