import { Selector } from '@/components/UI/Selector/Selector'
import Link from 'next/link'
import type { FC } from 'react'
export interface SubheaderProps {
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
  return (
    <div className="flex justify-between  gap-4 py-4 text-white">
      <div className="flex items-center">
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
      <Selector
        text={text}
        setLimit={setLimit}
        setOffset={setOffset}
        items={items}
      />
    </div>
  )
}
export default Subheader
