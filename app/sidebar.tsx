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

const SideBar = () => {
  const currentPath = usePathname();

  return (
    <div className="h-[100%] shadow-lg w-[20%] py-5  border-r border-[#E6EAEE] hidden md:block">
      <ul className="">
        {sidebarArr.map((link, index) => (
          <li
            key={index}
            className={`my-2 ${
              link.href === currentPath && "bg-[#3976E8] cursor-pointer"
            }  gap-3 p-3 px-[30px] `}
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

export default SideBar;
