import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import Pointer from '../../../public/svg/Pointer'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../UI/Modal/Modal'
import Donation from '../Donation/Donation'
import useDebounce from '@/hooks/useDebounce'
import { RootState } from '@/store/index'
import { increaseActualBalance } from '@/store/slices/balanceSlice'
import { cn } from '../../lib/utils'
import Logo from '../../../public/svg/Logo'

const Header: FC = ({}) => {
  const [search, setSearch] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const items = useSelector((state: any) => state.favorite.favorite)
  const debouncedValue = useDebounce(search, 1000)

  const dispatch = useDispatch()

  const balance = useSelector((state: RootState) => state.balance.balance)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  useEffect(() => {
    dispatch(increaseActualBalance())
  })

  const handleSearchFav = () => {
    const arr = []

    for (let i = 0; i < items.length; i++) {
      arr.push(items[i].id)
    }
    return arr
  }

  const setSearchFromFav = () => {
    const deb = handleSearchFav()
    const regex = new RegExp(`${debouncedValue}`)
    const arr = []

    if (!debouncedValue) {
      return
    }
    for (let i = 0; i < deb.length; i++) {
      if (deb[i].match(regex)) {
        arr.push(deb[i])
      }
    }
    return arr
  }

  console.log(search, setSearchFromFav())

  return (
    <header className={cn('border-b-2')}>
      <div className={'container mx-auto my-3 flex justify-between gap-4'}>
        <Link href="/">
          <div className="flex items-center">
            <Logo /> <p className="ml-2 text-2xl font-semibold ">Cripto Hub</p>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/watchlist"
            className="flex leading-8 hover:text-cyan-400"
          >
            <div className="pt-2">
              <Pointer />
            </div>

            <div className="">Watchlist</div>
          </Link>
          <Link href="/portfolio" className="leading-8 hover:text-cyan-400">
            Portfolio
          </Link>
          <input
            placeholder="Search"
            value={search}
            onChange={(e) => {
              handleChange(e)
            }}
          />

          <div>Current Balance: {balance}</div>
          <button
            className="rounded-lg border border-cyan-400 p-2"
            onClick={() => setOpenModal(!openModal)}
          >
            Increase balance
          </button>
        </div>
      </div>
      <div>
        {setSearchFromFav()
          ? setSearchFromFav()!.map((item: any) => (
              <div className="container mx-auto">{item}</div>
            ))
          : null}
      </div>
      {openModal && (
        <Modal active={openModal} setActive={setOpenModal}>
          <Donation />
        </Modal>
      )}
    </header>
  )
}

export default Header
