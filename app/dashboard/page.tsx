"use client";
import React, { useEffect, useState } from "react";
import AccountCardDetail from "../../components/accountCardDetail";
import DashboardChart from "../../components/chart";
import Dropdown from "../../components/dropdown";

const period: {
  label: string | number;
  value: string | number;
  api: string;
}[] = [
  { label: "Today", value: "today", api: "revenue-day" },
  { label: "Last 7 days", value: "7 days", api: "revenue-week" },
  { label: "Last 30 days", value: "30 days", api: "revenue-month" },
];
const Dashboard = () => {
  const [filterPeriod, setFilterPeriod] = useState("7 days");
  const [dataArr, setDataArr] = useState<
    { label: string | number; value: string | number }[]
  >([]);
  const [bankDetails, setBankDetails] = useState<{
    bank: string;
    amount: number;
    accountName: string;
  }>();

  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(String(bankDetails?.amount));
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 5000)
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const apiUrl = "https://qetstymo2u.api.quickmocker.com";

  const routeString = period?.find((item) => item.value === filterPeriod)?.api;
  const fullApiUrl = `${apiUrl}/${routeString}`;

  useEffect(() => {
    if (filterPeriod) {
      fetch(fullApiUrl, {
        method: "GET",
        cache: "no-store", // Ensure a non-cached response
      })
        .then((response) => response.json())
        .then((data) => {
          setDataArr(data);
        })
        .catch((error) => {
          if (routeString === "revenue-day") {
            setDataArr([
              { label: 3, value: 800 },
              { label: 6, value: 1200 },
              { label: 9, value: 1500 },
              { label: 12, value: 1000 },
              { label: 15, value: 1800 },
              { label: 18, value: 2000 },
              { label: 21, value: 1600 },
              { label: 24, value: 800 },
            ]);
          }
          if (routeString === "revenue-week") {
            setDataArr([
              { label: "Monday", value: 1200 },
              { label: "Tuesday", value: 1500 },
              { label: "Wednesday", value: 800 },
              { label: "Thursday", value: 2000 },
              { label: "Friday", value: 1700 },
              { label: "Saturday", value: 2500 },
              { label: "Sunday", value: 1800 },
            ]);
          }
          if (routeString === "revenue-month") {
            setDataArr([
              { label: "week 1", value: 10500 },
              { label: "week 2", value: 11200 },
              { label: "week 3", value: 9800 },
              { label: "week 4", value: 11050 },
            ]);
          }
        });
    }
  }, [filterPeriod, fullApiUrl]);

  useEffect(() => {
    fetch(`${apiUrl}/bank-details`, {
      method: "GET",
      cache: "no-store", // Ensure a non-cached response
    })
      .then((response) => response.json())
      .then((data) => {
        setBankDetails(data);
      })
      .catch((error) => {
        console.log(error);
        setBankDetails({
          bank: "Sterling Bank",
          amount: 8000000000,
          accountName: "OGEDENGBE FRUITS STORE",
        });
      });
  }, [fullApiUrl]);

  return (
    <div className=" w-full  h-[90%] ">
      <div className=" h-[440px] w-full overflow-y-scroll">
        <div className="md:w-full md:block md:pl-[70px] my-[30px] flex justify-center  px-4 ">
          {bankDetails?.accountName && (
            <AccountCardDetail
              bank={bankDetails?.bank}
              amount={bankDetails?.amount}
              accountName={bankDetails?.accountName}
              handleCopyClick={handleCopyClick}
              isCopied={isCopied}
            />
          )}
        </div>
        <div className="rounded-[10px] p-[30px] mx-[70px] border border-[#E4E4E7] hidden md:block ">
          <div className="h-[20%] mb-[30px] flex justify-between items-center">
            <div className="flex justify-start  gap-2 items-center ">
              <span className="hidden lg:block text-[#71717A] text-[14px] font-[500]">
                Showing data for
              </span>
              <Dropdown
                data={period}
                setFilterPeriod={setFilterPeriod}
                radius="DESKTOP"
              />
            </div>

            <div className="flex justify-between items-center gap-2 text-[#000000] font-[500] px-3 text-[12px]">
              {period.map((item, index) => (
                <span
                  key={index}
                  className={`${
                    item.value === filterPeriod
                      ? "bg-[#00C6FB0F] p-1 rounded-md"
                      : ""
                  }`}
                >
                  {item.label}
                </span>
              ))}
            </div>
          </div>
          <div className="">
            {dataArr.length > 0 && (
              <DashboardChart
                filterPeriod={filterPeriod}
                setFilterPeriod={setFilterPeriod}
                data={dataArr}
              />
            )}
          </div>
        </div>
        <div className="w-[100%] px-4 md:hidden">
          {dataArr.length > 0 && (
            <DashboardChart
              filterPeriod={filterPeriod}
              setFilterPeriod={setFilterPeriod}
              data={dataArr}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
