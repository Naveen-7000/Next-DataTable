export interface TableData {
    Timestamp: string;
    PurchaseId: string;
    Mail: string;
    Name: string;
    Source: string;
    Status: string;
    Select: string;
    [key: string]: string;
  }

export interface TableHeader {
    key : string;
  }

export interface DataTableProps {
  sortable?: boolean;
  caption?: string;
  pagination?: boolean;
  headers : TableHeader[];
  rows : TableData[];
}