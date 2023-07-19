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
import { generateDummyData, PaginationData } from "@/utils/data";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { TableData, TableHeader, DataTableProps } from "@/utils/interfaces";

const DataTable: React.FC<DataTableProps> = ({
  sortable,
  caption,
  pagination,
  headers,
  rows,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const sortedData = [...rows].sort((a, b) => {
    const valueA = parseInt(a["Timestamp"].split(" ")[0]);
    const valueB = parseInt(b["Timestamp"].split(" ")[0]);
    if (sortOrder === "asc") {
      return valueA - valueB;
    } else {
      return valueB - valueA;
    }
  });

  const { totalPages, currentEntries } = PaginationData(
    sortedData,
    currentPage,
    pagination
  );

  const handlePrevPage = () => {
    if (currentPage === 1) return;
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage === totalPages) return;
    setCurrentPage((prevPage) => prevPage + 1);
  };

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
            <Thead
              onClick={sortable ? () => handleSort() : undefined}
              cursor={sortable ? "pointer" : "default"}
            >
              <Tr>
                {headers?.map((header, index) => (
                  <Th key={index}>{header.key}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {currentEntries?.map((entry, index) => (
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
              ))}
            </Tbody>
          </Table>
          {pagination && (
            <Flex p="2" align="center" justify="space-between">
              <Button
                leftIcon={<ArrowLeftIcon />}
                onClick={handlePrevPage}
                variant="outline"
              ></Button>
              <span>
                {currentPage} - {totalPages}
              </span>
              <Button
                rightIcon={<ArrowRightIcon />}
                onClick={handleNextPage}
                variant="outline"
              ></Button>
            </Flex>
          )}
        </TableContainer>
      </Box>
    </Box>
  );
};

export default DataTable;
