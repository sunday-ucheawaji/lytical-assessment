"use client";
import { Card } from "@radix-ui/themes";
import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  CartesianGrid,
} from "recharts";
import { TbCurrencyNaira } from "react-icons/tb";
import Dropdown from "./dropdown";

const period: { label: string; value: string }[] = [
  { label: "Today", value: "today" },
  { label: "Last 7 days", value: "7 days" },
  { label: "Last 30 days", value: "30 days" },
];
interface Props {
  setFilterPeriod: React.Dispatch<React.SetStateAction<string>>;
  filterPeriod: string;
  data:{ label: string | number; value: string | number  }[]
}

const DashboardChart = ({ setFilterPeriod, filterPeriod, data }: Props) => {
 

  const [dataModified, setDataModified] = useState<[]>();
  const [barSizeChart, setBarSizeChart] = useState<number>();

  const calculateBarSize: any = ({ width }: { width: any }) => {
    if (width > 900) {
      return 30;
    }
    if (width < 900 && width > 767) {
      return 20;
    }
    if (width < 767 && width > 500) {
      return 25;
    }

    return 15;
  };

  const dataArr: any = ({ width }: { width: any }) => {
    if (width < 600) {
      return data.slice(0, 6);
    }
    return data;
  };

  

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      setBarSizeChart(calculateBarSize({ width: currentWidth }));
    };

    handleResize();

    // Check if we are in a browser environment before adding event listener
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      // Check if we are in a browser environment before removing event listener
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []); 
  
  const currentWidth = window.innerWidth;
  useEffect(() => {
    // Handle data updates here
    setDataModified(dataArr({ width: currentWidth }));
  }, [data, currentWidth]);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      setDataModified(dataArr({ width: currentWidth }));
    };
  
    handleResize();
  
    // Check if we are in a browser environment before adding event listener
    if (typeof window !== 'undefined') {
      window.addEventListener("resize", handleResize);
    }
  
    return () => {
      // Check if we are in a browser environment before removing event listener
      if (typeof window !== 'undefined') {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []); // No dependencies to ensure the effect only runs once
  

  return (
    <Card className="visible-element md:block">
      <div className="mx-8 my-4 hidden md:block">
        <div className=" text-[14px] flex justify-start items-center gap-2">
          <span className=" text-[#424242] font-[700]">Revenue</span>
          <span className="text-[#6DC27F] ">+0.00</span>
          <span className="text-[#000000]">vs {filterPeriod}</span>
        </div>
        <p className=" flex items-center">
          <TbCurrencyNaira size={"28px"} />{" "}
          <span className="font-bold text-[25px]">0.00</span>{" "}
          <span className="mx-2 text-[13px]">in total value</span>
        </p>
      </div>
      <div className="my-4 flex justify-between items-center md:hidden">
        <span className="pl-[30px] text-[#424242] font-[700]">Revenue</span>
        <Dropdown
          data={period}
          setFilterPeriod={setFilterPeriod}
          radius="MOBILE"
        />
      </div>

      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart data={dataModified}>
          <XAxis dataKey="label" />
          <YAxis />
          <CartesianGrid horizontal={true} strokeDasharray="2 3" />

          <Bar dataKey="value" barSize={barSizeChart} fill="#FFC145" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default DashboardChart;
