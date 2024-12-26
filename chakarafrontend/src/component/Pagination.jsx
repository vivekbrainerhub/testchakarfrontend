import React from 'react';
import { Box, Button, Center, Flex } from '@chakra-ui/react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageRange = () => {
    const range = [];
    const maxVisiblePages = 10;
    const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPage = currentPage - halfMaxVisiblePages;
    let endPage = currentPage + halfMaxVisiblePages;

    if (startPage <= 0) {
      endPage += Math.abs(startPage) + 1;
      startPage = 1;
    }

    if (endPage > totalPages) {
      startPage -= endPage - totalPages;
      endPage = totalPages;
    }

    startPage = Math.max(startPage, 1); // Ensure startPage is not negative
    endPage = Math.min(endPage, totalPages); // Ensure endPage is within totalPages

    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

    return range;
  };

  const pageRange = getPageRange();

  return (
    <Center>
      <Flex>
        {currentPage > 1 && (
          <Button onClick={() => onPageChange(currentPage - 1)} mr={2}>
            Previous
          </Button>
        )}

        {pageRange.map((pageNumber) => (
          <Box
            key={pageNumber}
            as={Button}
            bg={currentPage === pageNumber ? 'blue.500' : 'gray.200'}
            color={currentPage === pageNumber ? 'white' : 'black'}
            onClick={() => onPageChange(pageNumber)}
            mr={2}
          >
            {pageNumber}
          </Box>
        ))}

        {currentPage < totalPages && (
          <Button onClick={() => onPageChange(currentPage + 1)} ml={2}>
            Next
          </Button>
        )}
      </Flex>
    </Center>
  );
};

export default Pagination;