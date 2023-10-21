import React from "react";
import { Button } from "@chakra-ui/react";



const Paginator = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div>
      {Array.from({ length: totalPages }, (_, i) => (
        <Button
          key={`pagination_number_${i + 1}`}
          variant={i + 1 === currentPage ? "solid" : "outline"}
          onClick={() => onPageChange(i + 1)}
          mr={2}
          mt={10}
          sx={{
            width: "40px",
            borderRadius: "26px",
            height: "25px",
            backgroundColor: "#00B87C",
            border: "none",
            _hover: {
              backgroundColor: "#00B87C",
              opacity: "0.8",
              cursor: "pointer",
            },
          }}
        >
          {i + 1}
        </Button>
      ))}
    </div>
  );
};

export default Paginator;