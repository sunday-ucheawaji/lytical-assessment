import { dateFormatter } from "@/app/utilities";
import Status from "@/components/status";
import { Checkbox, Table, TableRoot } from "@radix-ui/themes";
import React from "react";
import { TbCurrencyNaira } from "react-icons/tb";

interface Props {
  data: {
    id: number;
    amount: number;
    transactionId: string;
    date: string;
    status: "Processed" | "Failed";
    transactionType: "Transfer" | "Withdraw" | "Deposit" | "Request";
    isChecked: boolean;
  }[];
  handleCheckbox: (
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
  ) => void;
  handleCheckAll: (checked: boolean) => void;
}

const TransactionTable = ({ data, handleCheckbox, handleCheckAll }: Props) => {
  return (
    <div>
      <Table.Root variant="ghost" className="hidden md:block h-[300px]">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>
              <Checkbox
                onCheckedChange={() =>
                  handleCheckAll(data.every((item) => item.isChecked))
                }
                checked={data.every((item) => item.isChecked)}
              />
            </Table.ColumnHeaderCell>

            <Table.ColumnHeaderCell className="text-[#84919A] text-[11px]">
              AMOUNT
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="text-[#84919A] text-[11px]">
              TRANSACTION ID
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="text-[#84919A] text-[11px]">
              TRANSACTION TYPE
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="text-[#84919A] text-[11px]">
              DATE
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="text-[#84919A] text-[11px]">
              TIME
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="text-[#84919A] text-[11px]">
              STATUS
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body className="bg-[#FFFFFF] rounded-lg border">
          {data.map((item, index) => (
            <Table.Row className="" key={item.id}>
              <Table.Cell>
                <Checkbox
                  onCheckedChange={() => handleCheckbox(index, item)}
                  checked={item.isChecked}
                />
              </Table.Cell>
              <Table.Cell className="text-[#000505] ">
                <span className="inline-block -mb-1">
                  <TbCurrencyNaira  size={20} />
                </span>
                <span className="inline-block">{item.amount}</span>
              </Table.Cell>
              <Table.Cell className="text-[#535379] font-[400] text-[13px]">
                {item.transactionId}
              </Table.Cell>
              <Table.Cell className="text-[#535379] font-[400] text-[13px]">
                {item.transactionType}
              </Table.Cell>
              <Table.Cell className="text-[#535379] font-[400] text-[13px]">
                {dateFormatter(item.date, "MMM DD, YYYY")}
              </Table.Cell>
              <Table.Cell className="text-[#535379] font-[400] text-[13px]">
                {dateFormatter(item.date, "HH:MM a")}
              </Table.Cell>
              <Table.Cell className="text-[#535379] font-[400] text-[13px]">
                <Status statusType={item.status} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <div className="text-[#111827] font-[600] md:hidden">Transactions</div>
      <Table.Root className="md:hidden">
        <Table.Body>
          <Table.Row>
            {data.map((item) => (
              <div
                key={item.id}
                className="border border-[#DADAE7] text-[#252C32] text-[12px] my-4 p-2 rounded-md"
              >
                <div className="flex justify-between items-center border-b rounded-[5px] p-2 border-[#DADAE7]">
                  <span>AMOUNT:</span>{" "}
                  <span className="flex items-center">
                    <TbCurrencyNaira size={20} />
                    {item.amount}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b rounded-[5px] p-2 border-[#DADAE7]">
                  <span>TRANSACTION TYPE:</span>{" "}
                  <span>{item.transactionType}</span>
                </div>
                <div className="flex justify-between items-center border-b rounded-[5px] p-2 border-[#DADAE7]">
                  <span>DATE:</span>{" "}
                  <span>
                    {" "}
                    {dateFormatter(item.date, "DD MMM, YYYY, hh:mm a")}
                  </span>
                </div>
                <div className="flex justify-between items-center rounded-[5px] p-2 ">
                  <span className="w-[60px]">STATUS:</span>{" "}
                  <Status statusType={item.status} />
                </div>
              </div>
            ))}
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default TransactionTable;
