import React from "react";

const Status = ({ statusType }: { statusType: string }) => {
  return (
    <div
      className={`w-[100px] rounded-[100px] flex justify-center py-1 gap-2 items-center ${
        statusType === "Processed"
          ? " bg-[#EFFDED] border-[#5DC090] border text-[#144909]"
          : "bg-[#FEECEE] border-[#F14156] border text-[#740613]"
      }`}
    >
      <span
        className={`w-[10px] h-[10px] tetx-[14px] rounded-[50%]  ${
          statusType === "Processed" ? " bg-[#92EF80]  " : " bg-[#F14156] "
        }`}
      ></span>
      {statusType}
    </div>
  );
};

export default Status;
