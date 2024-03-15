import React from "react";
import Image from "next/image";
import bell from "./icon/bell.svg";
import menu from "./icon/menuIcon.svg";
import arrow from "./icon/arrow.svg";
import { setSidebar } from "./reducers/clientReducer";
import { useDispatch } from "react-redux";
import { Redressed } from "next/font/google";
import Link from "next/link";

const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });

const NavBar = () => {
  const dispatch = useDispatch();
  return (
    <nav className="h-[10%] w-full py-5 px-[30px] flex items-center justify-between border-b bg-[#FBFBFB]  border-[#E6EAEE]">
      <div className="flex gap-5">
        <Image
          className="cursor-pointer md:hidden"
          src={menu}
          alt="menu icon"
          onClick={() => {
            dispatch(setSidebar(true));
          }}
        />

        <Link
          className={`${redressed.className} font-bold text-2xl cursor-pointer hidden  md:block pt-4 h-[50px]`}
          href="/"
        >
          Lytical Technology
        </Link>
      </div>
      <Link
        className={`${redressed.className} font-bold text-2xl cursor-pointer   md:hidden]`}
        href="/"
      >
        Lytical Technology
      </Link>

      <div className="flex items-center gap-1 md:gap-4">
        <Image
          className="cursor-pointer h-5 w-5 md:h-8 md:w-8"
          src={bell}
          alt="bell icon"
        />
        <div className=" h-6 w-6 md:h-8 md:w-8 bg-[#0CBC8B] rounded-[50%] flex justify-center items-center text-[#FFFFFF] text-[10px] md:text-[16px]">
          {" "}
          QA
        </div>
        <Image
          className="cursor-pointer hidden md:block"
          src={arrow}
          alt="arrow icon"
        />
      </div>
    </nav>
  );
};

export default NavBar;
