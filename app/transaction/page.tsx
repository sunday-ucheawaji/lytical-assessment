"use client";
import React, { useState, useEffect } from "react";
import TransactionTable from "../../components/transactionTable";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { DateRange } from "react-day-picker";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { setSelectedItems } from "../reducers/clientReducer";

const mockData = [
  {
    id: 1,
    amount: 52300,
    transactionId: "TR_8401857902",
    date: "2024-01-03T12:30:00Z",
    status: "Processed",
    transactionType: "Transfer",
  },
  {
    id: 2,
    amount: 18900,
    transactionId: "TR_8401857903",
    date: "2024-01-04T12:45:00Z",
    status: "Fail",
    transactionType: "Withdrawal",
  },
  {
    id: 3,
    amount: 78200,
    transactionId: "TR_8401857904",
    date: "2024-01-05T13:00:00Z",
    status: "Processed",
    transactionType: "Deposit",
  },
  {
    id: 4,
    amount: 31500,
    transactionId: "TR_8401857905",
    date: "2024-01-06T13:15:00Z",
    status: "Processed",
    transactionType: "Request",
  },
  {
    id: 5,
    amount: 45600,
    transactionId: "TR_8401857906",
    date: "2024-01-07T13:30:00Z",
    status: "Fail",
    transactionType: "Transfer",
  },
  {
    id: 6,
    amount: 89000,
    transactionId: "TR_8401857907",
    date: "2024-01-08T13:45:00Z",
    status: "Processed",
    transactionType: "Withdrawal",
  },
  {
    id: 7,
    amount: 23400,
    transactionId: "TR_8401857908",
    date: "2024-01-09T14:00:00Z",
    status: "Processed",
    transactionType: "Deposit",
  },
  {
    id: 8,
    amount: 67100,
    transactionId: "TR_8401857909",
    date: "2024-01-10T14:15:00Z",
    status: "Fail",
    transactionType: "Request",
  },
  {
    id: 9,
    amount: 58900,
    transactionId: "TR_8401857910",
    date: "2024-01-11T14:30:00Z",
    status: "Processed",
    transactionType: "Transfer",
  },
  {
    id: 10,
    amount: 74200,
    transactionId: "TR_8401857911",
    date: "2024-01-12T14:45:00Z",
    status: "Fail",
    transactionType: "Withdrawal",
  },
  {
    id: 11,
    amount: 31800,
    transactionId: "TR_8401857912",
    date: "2024-01-13T15:00:00Z",
    status: "Processed",
    transactionType: "Deposit",
  },
  {
    id: 12,
    amount: 49500,
    transactionId: "TR_8401857913",
    date: "2024-01-14T15:15:00Z",
    status: "Processed",
    transactionType: "Request",
  },
  {
    id: 13,
    amount: 62100,
    transactionId: "TR_8401857914",
    date: "2024-01-15T15:30:00Z",
    status: "Fail",
    transactionType: "Transfer",
  },
  {
    id: 14,
    amount: 26700,
    transactionId: "TR_8401857915",
    date: "2024-01-16T15:45:00Z",
    status: "Processed",
    transactionType: "Withdrawal",
  },
  {
    id: 15,
    amount: 87400,
    transactionId: "TR_8401857916",
    date: "2024-01-17T16:00:00Z",
    status: "Processed",
    transactionType: "Deposit",
  },
  {
    id: 16,
    amount: 35400,
    transactionId: "TR_8401857917",
    date: "2024-01-18T16:15:00Z",
    status: "Fail",
    transactionType: "Request",
  },
  {
    id: 17,
    amount: 41200,
    transactionId: "TR_8401857918",
    date: "2024-01-19T16:30:00Z",
    status: "Processed",
    transactionType: "Transfer",
  },
  {
    id: 18,
    amount: 59000,
    transactionId: "TR_8401857919",
    date: "2024-01-20T16:45:00Z",
    status: "Fail",
    transactionType: "Withdrawal",
  },
  {
    id: 19,
    amount: 73600,
    transactionId: "TR_8401857920",
    date: "2024-01-20T17:00:00Z",
    status: "Processed",
    transactionType: "Deposit",
  },
  {
    id: 20,
    amount: 63400,
    transactionId: "TR_8401857921",
    date: "2024-01-20T17:15:00Z",
    status: "Fail",
    transactionType: "Request",
  },
];

const TransactionPage = () => {
  const [modifiedData, setModifiedData] = useState<
    {
      id: number;
      amount: number;
      transactionId: string;
      date: string;
      status: "Processed" | "Failed";
      transactionType: "Transfer" | "Withdraw" | "Deposit" | "Request";
      isChecked: boolean;
    }[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filterType = useSelector((state: RootState) => state.client.myValue);
  const selectedDateRange = useSelector(
    (state: RootState) => state.client.dateRange
  );

  const handleCheckAll = (checked: boolean) => {
    const arr = modifiedData.map((item, index) => {
      if (checked) {
        return { ...item, isChecked: false };
      }
      return { ...item, isChecked: true };
    });

    setModifiedData(arr);
  };

  const handleCheckbox = (
    index: number,
    item: {
      id: number;
      amount: number;
      transactionId: string;
      date: string;
      status: "Processed" | "Failed";
      transactionType: "Transfer" | "Withdraw" | "Deposit" | "Request";
      isChecked: boolean;
    }
  ) => {
    const resetArr = modifiedData?.map(
      (
        transac: {
          id: number;
          amount: number;
          transactionId: string;
          date: string;
          status: "Processed" | "Failed";
          transactionType: "Transfer" | "Withdraw" | "Deposit" | "Request";
          isChecked: boolean;
        },
        indexTransac: number
      ) => {
        if (index === indexTransac) {
          return { ...transac, isChecked: !transac.isChecked };
        }
        return transac;
      }
    );
    setModifiedData(resetArr);
  };

  const filteredData = modifiedData?.filter(
    (item: {
      id: number;
      amount: number;
      transactionId: string;
      date: string;
      status: "Processed" | "Failed";
      transactionType: "Transfer" | "Withdraw" | "Deposit" | "Request";
      isChecked: boolean;
    }) => {
      const dateWithinRange =
        !selectedDateRange ||
        (selectedDateRange.from &&
          selectedDateRange.to &&
          new Date(item.date) >= selectedDateRange.from &&
          new Date(item.date) <= selectedDateRange.to);

      const transactionTypeMatches = item.transactionType.includes(filterType);

      return dateWithinRange && transactionTypeMatches;
    }
  );

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  const handleClick = (page: number) => {
    setCurrentPage(page);
  };

  const handleNext = () => {
    setCurrentPage((prevPage) =>
      prevPage === pageCount ? prevPage : prevPage + 1
    );
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => (prevPage === 1 ? prevPage : prevPage - 1));
  };

  const convertData = () => {
    const dataArr: any = mockData.map((item) => ({
      ...item,
      isChecked: false,
    }));
    setModifiedData(dataArr);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (mockData) {
      convertData();
    }
  }, [mockData]);

  useEffect(() => {
    if (modifiedData) {
      dispatch(setSelectedItems(modifiedData));
    }
  }, [modifiedData]);

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

  return (
    <div className="px-[20px] mt-10">
      <TransactionTable
        handleCheckbox={handleCheckbox}
        handleCheckAll={handleCheckAll}
        data={getPaginatedData()}
      />
      <div className="block sm:flex justify-between my-4 items-center px-2">
        <p className="hidden sm:block text-[14px] text-[#696D8C]">
          Showing {itemsPerPage > filteredData.length? filteredData.length : itemsPerPage} of {filteredData.length} results
        </p>
        <div className="flex justify-between  xs:justify-start items-center gap-2">
          <button
            className="border rounded-[5px] p-1 border-[#DADAE7]"
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            <RiArrowLeftSLine />
          </button>
          {Array.from({ length: pageCount }).map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handleClick(index + 1)}
              className={`${
                currentPage === index + 1 ? "bg-blue-500 text-white" : ""
              } border rounded-[5px] w-[25px] border-[#DADAE7]`}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="border rounded-[5px] p-1 border-[#DADAE7]"
            onClick={handleNext}
            disabled={currentPage === pageCount}
          >
            <RiArrowRightSLine />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
