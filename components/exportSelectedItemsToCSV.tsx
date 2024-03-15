import Papa from 'papaparse';

interface TransactionItem {
  id: number;
  amount: number;
  transactionId: string;
  date: string;
  status: "Processed" | "Failed";
  transactionType: "Transfer" | "Withdraw" | "Deposit" | "Request";
  isChecked: boolean;
}

export function exportSelectedItemsToCSV(selectedItems: TransactionItem[]): void {
  // Filter out only the selected items
  const selectedItemsToExport = selectedItems.filter(item => item.isChecked);

  // Create a CSV data string using papaparse
  const csvData = Papa.unparse(selectedItemsToExport, {
    header: true, // Include headers
  });

  // Create a Blob from the CSV data
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });

  // Create a link element to trigger the download
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', 'selected_items.csv');
  document.body.appendChild(link);

  // Trigger the download and remove the link element
  link.click();
  document.body.removeChild(link);
}

// // Example usage:
// const selectedItems: TransactionItem[] = [
//   { id: 1, amount: 100, transactionId: "TR_123", date: "2022-01-01", status: "Processed", transactionType: "Transfer", isChecked: true },
//   { id: 2, amount: 150, transactionId: "TR_456", date: "2022-01-02", status: "Failed", transactionType: "Withdraw", isChecked: true },
//   // ... more selected items
// ];

// exportSelectedItemsToCSV(selectedItems);
