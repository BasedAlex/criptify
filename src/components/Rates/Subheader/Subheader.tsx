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
  setOffset: (offset: number) => void
  text?: string
  items?: string[]
}

const Subheader: FC<SubheaderProps> = ({
  setLimit,
  setOffset,
  text,
  items,
}) => {
  const changeLimit = (value: string) => {
    setLimit(Number(value))
    setOffset(0)
  }

  return (
    <div className="flex justify-between  gap-4 pt-4 text-white">
      <div>
        <Link
          href="watchlist"
          className={`hover:text-semibold rounded-sm border-0 px-2 ${text} hover:bg-cyan-600`}
        >
          Watchlist
        </Link>
        <Link
          href="portfolio"
          className={`hover:text-semibold rounded-sm border-0 px-2 ${text} hover:bg-cyan-600`}
        >
          Portfolio
        </Link>
      </div>
      <Select onValueChange={(value) => changeLimit(value)}>
        <SelectTrigger className={`w-[180px] ${text}`}>
          <SelectValue placeholder="Items on page" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={items ? items[0] : '20'}>
            {items ? items[0] : '25'}
          </SelectItem>
          <SelectItem value={items ? items[1] : '50'}>
            {items ? items[1] : '50'}
          </SelectItem>
          <SelectItem value={items ? items[2] : '100'}>
            {items ? items[2] : '100'}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
export default Subheader
