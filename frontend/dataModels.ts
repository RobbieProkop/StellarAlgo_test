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
  "Ticket Type": string,
  totalNumTickets: number
}

export interface Q1Data {
  totalPrice: number
}
export interface Q1 {
  event1Sum: number | null,
  event2Sum: number | null
}

export interface Q2 {
  'Ticket Type': string;
  'Event Name': string;
  total: number;
}

export interface Q3Names {
  "First Name": string,
  "Last Name": string,
  "Price": number
}

export interface Q3 {
  FirstName: string,
}

export interface Q4Data {
  "First Name": string,
  "Last Name": string,
}
export interface Q4Data2 {
  "First Name": string,
}

export interface Q5Data {
  sum: number
}
export interface Q5 {
  'Ticket Type': string;
  'Event Name': string;
  total: number;
}
