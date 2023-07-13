import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../Dropbox/Dropbox'
import { DotsVerticalIcon } from '@radix-ui/react-icons'

interface IProps {
  title: string[]
  onSelect?: any
}

export default function Dropdown({ title, onSelect }: IProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <DotsVerticalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {title.map((item) => (
          <DropdownMenuItem key={item} onClick={onSelect}>
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
