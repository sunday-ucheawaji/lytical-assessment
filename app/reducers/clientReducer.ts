// reducers/counterReducer.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateRange } from "react-day-picker";

interface ClientState {
  myValue: string;
  dateRange: DateRange | undefined;
  showSidebar: boolean;
  selectedItems: {
    id: number;
    amount: number;
    transactionId: string;
    date: string;
    status: "Processed" | "Failed";
    transactionType: "Transfer" | "Withdraw" | "Deposit" | "Request";
    isChecked: boolean;
  }[];
}

const initialState: ClientState = {
  myValue: "",
  dateRange: undefined,
  selectedItems: [],
  showSidebar: false,
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<string>) => {
      state.myValue = action.payload;
    },
    setDateRange: (state, action: PayloadAction<DateRange | undefined>) => {
      state.dateRange = action.payload;
      
    },
    setSidebar: (state, action:PayloadAction<boolean>)=>{
      state.showSidebar = action.payload
    },
    setSelectedItems: (
      state,
      action: PayloadAction<
        {
          id: number;
          amount: number;
          transactionId: string;
          date: string;
          status: "Processed" | "Failed";
          transactionType: "Transfer" | "Withdraw" | "Deposit" | "Request";
          isChecked: boolean;
        }[]
      >
    ) => {
      state.selectedItems = action.payload;
    },
  },
});

export const { setValue, setDateRange, setSelectedItems, setSidebar } = clientSlice.actions;
export default clientSlice.reducer;
