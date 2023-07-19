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
import { PaginationData } from "@/utils/data";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { DataTableProps } from "@/utils/interfaces";

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
    <Box mt="2">
      <TableContainer
        overflowX="scroll"
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
            {currentEntries?.map((data, index) => (
              <Tr key={index}>
                <Td>{data.Timestamp}</Td>
                <Td>{data.PurchaseId}</Td>
                <Td>{data.Mail}</Td>
                <Td>{data.Name}</Td>
                <Td>{data.Source}</Td>
                <Td>
                  <Text
                    bg={
                      data.Status == "Failed"
                        ? "#fed7d7"
                        : data.Status === "Paid"
                        ? "#c6f6d5"
                        : "#fefcc0"
                    }
                    textAlign="center"
                    rounded="20"
                    textColor="black"
                    fontWeight="700"
                    py="1"
                  >
                    {data.Status}
                  </Text>
                </Td>
                <Td>
                  <Button colorScheme="twitter" shadow="sm">
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
              leftIcon={<ChevronLeftIcon boxSize={6} />}
              onClick={handlePrevPage}
              variant="outline"
            ></Button>
            <span>
              Page <strong>{currentPage}</strong> of{" "}
              <strong>{totalPages}</strong>
            </span>
            <Button
              rightIcon={<ChevronRightIcon boxSize={6} />}
              onClick={handleNextPage}
              variant="outline"
            ></Button>
          </Flex>
        )}
      </TableContainer>
    </Box>
  );
};

export default DataTable;
