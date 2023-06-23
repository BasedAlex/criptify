import Link from "next/link";
import { FC, useEffect, useState } from "react";
import Pointer from "../../../public/svg/Pointer";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../UI/Modal/Modal";
import Donation from "../Donation/Donation";
import { useGetAssetQuery } from "@/store/fetchAPI/apiSlice";
import useDebounce from "@/hooks/useDebounce";
import { RootState } from "@/store/index";
import { increaseActualBalance } from "@/store/slices/balanceSlice";
import { cn } from "../../lib/utils";

const Header: FC = ({}) => {
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [skip, setSkip] = useState(true);
  const debouncedValue = useDebounce(search, 1500);
  const { data: singleAssetData } = useGetAssetQuery(debouncedValue, {
    skip,
  });
  const dispatch = useDispatch();

  const balance = useSelector((state: RootState) => state.balance.balance);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setSkip(false);
  };

  useEffect(() => {
    dispatch(increaseActualBalance());
  });

  console.log(singleAssetData);

  return (
    <header className={cn("border-b-2")}>
      <div className={"flex gap-4 my-5 justify-between container mx-auto"}>
        <Link className={"text-sm"} href="/">
          Cripto Hub
        </Link>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          The Joke Tax
        </h3>
        <div className="flex gap-4 ">
          <Link
            href="/watchlist"
            className="flex leading-8 hover:text-cyan-400">
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
              handleChange(e);
            }}
          />

          <div>Current Balance: {balance}</div>
          <button
            className="border border-cyan-400 rounded-lg p-2"
            onClick={() => setOpenModal(!openModal)}>
            Increase balance
          </button>
        </div>
      </div>
      <div>{singleAssetData?.data.id}</div>
      {openModal && (
        <Modal active={openModal} setActive={setOpenModal}>
          <Donation />
        </Modal>
      )}
    </header>
  );
};

export default Header;
