"use client";

import { generateDummyData } from "@/utils/data";
import DataTable from "./Home";
import { useEffect,useMemo,useState} from "react";
import { TableData,TableHeader } from "@/utils/interfaces";
import { Box,Flex,Heading, Input } from "@chakra-ui/react";
import TableShimmer from "@/components/TableShimmer";

export default function Home() {
  const [rows, setRows] = useState<TableData[]>([]);
  const [searchWord, setSearchWord] = useState<string>("");
  const [loading,setLoading] = useState<boolean>(false);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchWord(e.target.value);
  };

  const filterTableList: TableData[] | [] = useMemo(() => {
    if (!searchWord) {
      return rows;
    }

    const filteredTableData = rows.filter((value) =>
      [
        value?.Timestamp?.toLowerCase(),
        value?.Name?.toLowerCase(),
        value?.PurchaseId?.toString(),
        value?.Mail?.toString(),
        value?.Status?.toString(),
      ].some((item) => item?.includes(searchWord.toLowerCase()))
    );

    return filteredTableData;
  }, [searchWord, rows]);

  const filteredRows: TableData[] | [] = searchWord
		? filterTableList
		: rows;


  return (
    <Box p="4">
      {
        !loading && <TableShimmer />
      }
      <Flex align="center" justify="space-between">
        <Heading>Results</Heading>
        <Input type="text" variant='outline' placeholder='Search'value={searchWord} onChange={handleChange} htmlSize={10} width='auto' />
      </Flex>
      <DataTable pagination sortable headers={headers} rows={filteredRows} />
    </Box>
  );
}
