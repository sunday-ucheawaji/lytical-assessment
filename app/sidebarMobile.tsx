"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import AccountIcon from "./icon/accountIcon";
import DashboardIcon from "./icon/dashboardIcon";
import Globe from "./icon/globe";
import Setting from "./icon/setting";
import TransactionIcon from "./icon/transactionIcon";
import TransferIcon from "./icon/transferIcon";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { setSidebar } from "./reducers/clientReducer";
import { IoCloseSharp } from "react-icons/io5";

const sidebarArr = [
  { label: "Get Started", icon: Globe, href: "/get-started" },
  { label: "Dashboard", icon: DashboardIcon, href: "/" },
  { label: "Account", icon: AccountIcon, href: "/account" },
  { label: "Transfers", icon: TransferIcon, href: "/transfer" },
  { label: "Transactions", icon: TransactionIcon, href: "/transaction" },
  { label: "Settings", icon: Setting, href: "/setting" },
];

interface IconComponentProps {
  icon: React.ElementType;
  isClicked: boolean;
}

const IconComponent: React.FC<IconComponentProps> = ({
  icon: Icon,
  ...props
}) => {
  return <Icon {...props} />;
};

const SideBarMobile = () => {
  const currentPath = usePathname();

  const showSidebar = useSelector(
    (state: RootState) => state.client.showSidebar
  );

  const dispatch = useDispatch();
  return (
    <div
      className={`h-screen shadow-lg  py-5 bg-white  fixed top-0 w-[50%] border-r border-[#E6EAEE] transform transition-transform ${
        showSidebar
          ? "translate-x-0 transition-transform duration-3000"
          : "-translate-x-full transition-transform duration-3000"
      } ${showSidebar ? "" : "hidden"}  md:hidden`}
    >
      <div className="px-[20px] flex justify-end pr-[30px]">
        <IoCloseSharp
          onClick={() => {
            dispatch(setSidebar(false));
          }}
          size={30}
          className="hover:bg-black hover:text-white hover:rounded-[100%]"
        />
      </div>
      <ul className="">
        {sidebarArr.map((link, index) => (
          <li
            key={index}
            className={`my-2 ${
              link.href === currentPath && "bg-[#3976E8] cursor-pointer"
            }  gap-3 p-3 px-[30px] `}
            onClick={() => {
              dispatch(setSidebar(false));
            }}
          >
            <Link
              className="flex items-center justify-start w-[120px] gap-2"
              href={link.href}
              key={link.href}
            >
              <IconComponent
                isClicked={link.href === currentPath}
                icon={link.icon}
              />
              <span
                className={
                  link.href === currentPath
                    ? "text-[#FFFFFF]"
                    : "text-[#04004D]"
                }
              >
                {link.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBarMobile;
