import React, { FC } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../Select/Select'
import { SubheaderProps } from '@/components/Rates/Subheader/Subheader'

export const Selector: FC<SubheaderProps> = ({
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
    <div>
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
