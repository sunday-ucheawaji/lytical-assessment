"use client";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { DatePickerWithRange } from "../components/datePicker";
import exportIcon from "./icon/upload-cloud.svg";
import Image from "next/image";
import Dropdown from "../components/dropdown";
import { useDispatch, useSelector } from "react-redux";
import { setValue, setDateRange } from "./reducers/clientReducer";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import { RootState } from "@/lib/store";
import { exportSelectedItemsToCSV } from "../components/exportSelectedItemsToCSV";

const transctionType = [
  {
    label: "All",
    value: "",
  },
  {
    label: "Transfer",
    value: "Transfer",
  },
  {
    label: "Withdrawal",
    value: "Withdrawal",
  },
  {
    label: "Deposit",
    value: "Deposit",
  },
  {
    label: "Request",
    value: "Request",
  },
];

const SubNav = () => {
  const currentPath = usePathname();
  const dispatch = useDispatch();

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2023, 11, 20),
    to: addDays(new Date(2024, 11, 20), 20),
  });

  const selectedItems = useSelector(
    (state: RootState) => state.client.selectedItems
  );

  const handleIncrement = (filterType: string) => {
    dispatch(setValue(filterType));
  };

  useEffect(() => {
    if (date) {
      dispatch(setDateRange(date));
    }
  }, [date]);
  

  return (
    <>
      {currentPath === "/" ? (
        <div className="w-full px-[70px] border-b border-[#E6EAEE] h-[10%] ">
          <span className="h-full text-[#2E2E2E] font-[500]  items-center inline-flex border-b-2 border-[#3976E8] cursor-pointer">
            Online Payments
          </span>
        </div>
      ) : currentPath === "/transaction" ? (
        <div className="">
          <div className="w-full border-b-2 border-[#EDEDF2] pb-3 pt-5 px-7 flex justify-between items-center ">
            <span className="h-full text-[#2E2E2E] font-[500] gap-2  items-center inline-flex cursor-pointer">
              All Accounts
              <Dropdown
                data={transctionType}
                setFilterPeriod={handleIncrement}
                radius="DESKTOP"
              />
            </span>
            <div className="hidden md:flex justify-start items-center gap-2 text-[#71717A] text-[14px] font-[500]">
              <span className="hidden lg:block">Select Date Range:</span>
              <DatePickerWithRange
                date={date}
                setDate={setDate}
                className={""}
              />
              <span
                onClick={() => exportSelectedItemsToCSV(selectedItems)}
                className="flex border-[#D0D5DD] border rounded-md cursor-pointer gap-2 items-center py-2 px-2 "
              >
                <Image
                  className="cursor-pointer"
                  src={exportIcon}
                  alt="export"
                />
                <span className="text-[14px]">Export</span>
              </span>
            </div>
            <span className=" md:hidden flex border-[#D0D5DD] border rounded-md cursor-pointer gap-2 items-center py-2 px-2 ">
              <Image className="cursor-pointer" src={exportIcon} alt="export" />
              <span className="text-[14px] text-[#71717A] font-[500]">
                Export
              </span>
            </span>
          </div>
          <div className="md:hidden px-7 mt-4 flex justify-between items-center">
            <span className="text-[#71717A] font-[500] text-[14px]">
              Select Date Range:
            </span>

            <DatePickerWithRange date={date} setDate={setDate} className={""} />
          </div>
        </div>
      ):""}
    </>
  );
};

export default SubNav;
