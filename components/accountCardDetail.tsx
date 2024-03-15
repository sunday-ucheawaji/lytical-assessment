import React from "react";
import { BiCopy } from "react-icons/bi";

interface Props {
  bank: string;
  amount: number;
  accountName: string;
  handleCopyClick:()=> void;
  isCopied:boolean;
}

const AccountCardDetail = ({ bank, amount, accountName, handleCopyClick, isCopied }: Props) => {
  return (
    <div className="md:w-[325px] w-full  h-[115px] flex flex-col justify-between p-4 rounded-[5px] border border-[#E4E4E7] bg-[#FFF]">
      <p className="text-[#8F8E8E] text-[11px]">ACCOUNT DETAILS</p>
      <p className="font-[600] text-[11px] text-[#000000] uppercase">{bank}</p>
      <div className="flex justify-between items-center">
        {" "}
        <span className="font-[600] text-[20px]">{amount}</span>
        <div onClick={handleCopyClick} className="flex justify-center items-center cursor-pointer text-[14px] bg-[#9F56D433] p-1 rounded-[5px]">
          <BiCopy color="#9F56D4" />
          <span className="text-[#9F56D4] font-[500] text-[10px] gap-2">
            {isCopied? "Copied": "Copy"}
          </span>
        </div>
      </div>
      <p className="font-[600] text-[11px] text-[#000000] uppercase">{accountName}</p>

    </div>
  );
};

export default AccountCardDetail;
