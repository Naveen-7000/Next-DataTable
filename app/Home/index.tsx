"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  TableContainer,
  TableCaption,
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";
import { generateDummyData } from "@/utils/data";

interface TableData {
  Timestamp: string;
  PurchaseId: string;
  Mail: string;
  Name: string;
  Source: string;
  Status: string;
  Select: string;
  [key: string]: string;
}

interface TableHeader {
  TIMESTAMP: string;
  "PURCHASE ID": string;
  MAIL: string;
  NAME: string;
  SOURCE: string;
  STATUS: string;
  SELECT: string;
}

interface DataTableProps {
  sortable?: boolean;
  caption?: string;
  pagination?: boolean;
}

const DataTable: React.FC<DataTableProps> = ({
  sortable,
  caption,
  pagination,
}) => {
   const [tableData,setTableData] = useState<TableData[]>([]);
    useEffect(() => {
    const Data = generateDummyData();
    setTableData(Data);
    },[]);

    console.log(tableData,"setTableData");
    
  return (
    <Box padding="2">
      <Flex align="center" justify="space-between">
        <Heading>Results</Heading>
        <Button bg="#d4e9fa">Filter</Button>
      </Flex>
      <Box mt="2">
        <TableContainer
          overflowX="hidden"
          border="1px"
          borderColor="lightgrey"
          rounded="6"
        >
          <Table variant="striped" colorScheme="blackAlpha" size="sm">
            {caption && <TableCaption>{caption}</TableCaption>}
            <Thead>
              <Tr>
                <Th>TIMESTAMP</Th>
                <Th>PURCHASE ID</Th>
                <Th>MAIL</Th>
                <Th>NAME</Th>
                <Th>SOURCE</Th>
                <Th>STATUS</Th>
                <Th>SELECT</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
               tableData?.map((entry,index)=>(
                    <Tr key={index}>
                       <Td>{entry.Timestamp}</Td>
                <Td>{entry.PurchaseId}</Td>
                <Td>{entry.Mail}</Td>
                <Td>{entry.Name}</Td>
                <Td></Td>
                <Td>
                  <Text
                    bg="#fed7d7"
                    textAlign="center"
                    rounded="20"
                    textColor="black"
                    fontWeight="700"
                    py="1"
                  >
                    {entry.Status}
                  </Text>
                </Td>
                <Td>
                  <Button colorScheme="gray" shadow="sm">
                    Select
                  </Button>
                </Td>
                    </Tr>
               ))
              }
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default DataTable;
