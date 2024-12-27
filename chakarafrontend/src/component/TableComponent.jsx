import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Text,
  Button,
  useToast,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaArrowUp, FaArrowDown, FaEdit, FaEye, FaTrash } from "react-icons/fa";

// TableComponent for rendering a single table
const TableComponent = ({
  data,
  config,
  handleDelete,
  handleEdit,
  handleView,
}) => {
  const toast = useToast(); // For showing toast notifications
  const columns = data.length > 0 ? Object.keys(data[0]) : []; // Extract column names (keys)

  // State for sorting
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  // Sorting function
  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const sortOrder = sortConfig.direction === "asc" ? 1 : -1;
    if (a[sortConfig.key] < b[sortConfig.key]) return -1 * sortOrder;
    if (a[sortConfig.key] > b[sortConfig.key]) return 1 * sortOrder;
    return 0;
  });

  const handleSort = (column) => {
    if (sortConfig.key === column) {
      setSortConfig({
        key: column,
        direction: sortConfig.direction === "asc" ? "desc" : "asc",
      });
    } else {
      setSortConfig({ key: column, direction: "asc" });
    }
  };

  const tableSize = useBreakpointValue({ base: "sm", md: "md" });

  // Check if any action is enabled (view, edit, delete)
  const showActions = config.showView || config.showEdit || config.showDelete;

  return (
    <Box p={5} bg="gray.50" borderRadius="md" boxShadow="lg">
      <Text fontSize="2xl" fontWeight="bold" color="red.600" mb={4}>
        Table for Actions
      </Text>
      {data.length > 0 ? (
        <TableContainer
          borderRadius="lg"
          overflow="hidden"
          boxShadow="md"
          bg="white"
          border="1px solid"
          borderColor="red.200"
        >
          <Table variant="striped" colorScheme="red" size={tableSize}>
            <Thead bg="red.500" color="white">
              <Tr>
                {columns.map((col, index) => (
                  <Th
                    key={index}
                    textTransform="capitalize"
                    p={3}
                    fontSize="md"
                    onClick={() => handleSort(col)}
                    cursor="pointer"
                    _hover={{ bg: "red.600", opacity: 0.8 }}
                  >
                    {col.charAt(0).toUpperCase() + col.slice(1)}
                    {sortConfig.key === col && (
                      <Button
                        icon={
                          sortConfig.direction === "asc" ? (
                            <FaArrowUp />
                          ) : (
                            <FaArrowDown />
                          )
                        }
                        size="sm"
                        variant="link"
                        ml={2}
                        aria-label="Sort"
                      />
                    )}
                  </Th>
                ))}
                {showActions && (
                  <Th p={4} fontSize="md" textAlign="center">
                    Actions
                  </Th>
                )}
              </Tr>
            </Thead>
            <Tbody>
              {sortedData.map((row) => (
                <Tr
                  key={row.id}
                  _hover={{
                    bg: "red.50",
                    transform: "scale(1.02)",
                    transition: "all 0.2s",
                  }}
                >
                  {columns.map((col, colIndex) => (
                    <Td
                      key={colIndex}
                      p={4}
                      fontSize="sm"
                      color="gray.700"
                      _hover={{ color: "red.500", cursor: "pointer" }}
                    >
                      {row[col]}
                    </Td>
                  ))}
                  {showActions && (
                    <Td p={4} textAlign="center">
                      {config.showView && (
                        <Button
                          leftIcon={<FaEye />}
                          size="sm"
                          colorScheme="teal"
                          variant="outline"
                          onClick={() => handleView(row._id)}
                        >
                          View
                        </Button>
                      )}
                      {config.showEdit && (
                        <Button
                          leftIcon={<FaEdit />}
                          size="sm"
                          colorScheme="orange"
                          variant="outline"
                          ml={2}
                          onClick={() => handleEdit(row._id)}
                        >
                          Edit
                        </Button>
                      )}
                      {config.showDelete && (
                        <Button
                          leftIcon={<FaTrash />}
                          size="sm"
                          colorScheme="red"
                          variant="outline"
                          ml={2}
                          onClick={() => handleDelete(row._id)}
                        >
                          Delete
                        </Button>
                      )}
                    </Td>
                  )}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Box textAlign="center" p={6} color="gray.500" fontSize="lg">
          No data to show
        </Box>
      )}
    </Box>
  );
};

export default TableComponent;
// Main Component to handle multiple tables
