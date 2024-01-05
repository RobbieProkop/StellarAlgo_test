export interface ParquetObj {
  "First Name": string,
  "Last Name": string,
  "Purchase Date": string,
  "Event Date": string,
  "Event Name": string,
  "Section Name": number,
  "Row Name": number,
  "Seat Number": number,
  "Price": number,
  "Ticket Type": string
}

export interface Q1 {
  event1Sum: number,
  event2Sum: number
}

export interface Q2 {
  type: string;
  event: string;
  totalNumTickets: number;
}
export interface Q5 {
  type: string;
  event: string;
  totalPurchasePrice: number;
}