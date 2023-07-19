"use client";

import { generateDummyData } from "@/utils/data";
import DataTable from "./Home";
import { useEffect,useState} from "react";
import { TableData,TableHeader } from "@/utils/interfaces";

export default function Home() {
  const [rows, setRows] = useState<TableData[]>([]);
  const [headers, setHeaders] = useState<TableHeader[]>([
    { key: "Timestamp" },
    { key: "PurchaseId" },
    { key: "Mail" },
    { key: "Name" },
    { key: "Source" },
    { key: "Status" },
    { key: "Select" },
  ]);
  useEffect(() => {
    const Data = generateDummyData();
    setRows(Data);
  }, []);

  return (
    <div>
      <DataTable pagination sortable headers={headers} rows={rows} />
    </div>
  );
}
