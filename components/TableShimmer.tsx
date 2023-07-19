"use client";
import {
  Box,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Skeleton,
  Stack,
  Tr,
  Th,
  Flex,
} from "@chakra-ui/react";
import { TableHeader } from "@/utils/interfaces";

interface TableProps {
  headers: TableHeader[];
}
const TableShimmer: React.FC<TableProps> = ({ headers }) => {
  return (
    <Box mt="2">
      <TableContainer
        overflowX="hidden"
        border="1px"
        borderColor="lightgrey"
        rounded="6"
      >
        <Table variant="striped" colorScheme="blackAlpha" size="sm">
          <Thead>
            <Tr>
              {headers?.map((header, index) => (
                <Th key={index}>{header.key}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {Array.from({ length: 12 }, (_, index) => (
              <Tr key={index}>
                <Th>
                  <Skeleton height="30px" fadeDuration={3} />
                </Th>
                <Th>
                  <Skeleton height="30px" fadeDuration={3} />
                </Th>
                <Th>
                  <Skeleton height="30px" fadeDuration={3} />
                </Th>
                <Th>
                  <Skeleton height="30px" fadeDuration={3} />
                </Th>
                <Th>
                  <Skeleton height="30px" fadeDuration={3} />
                </Th>
                <Th>
                  <Skeleton height="30px" fadeDuration={3} />
                </Th>
                <Th>
                  <Skeleton height="30px" fadeDuration={3} />
                </Th>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Flex align="center" justify="space-between">
          <Skeleton height="30px" fadeDuration={3} />
          <Skeleton height="30px" fadeDuration={3} />
          <Skeleton height="30px" fadeDuration={3} />
        </Flex>
      </TableContainer>
    </Box>
  );
};

export default TableShimmer;
