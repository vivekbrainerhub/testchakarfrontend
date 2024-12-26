import React, { useState } from "react";
import { Button, Flex } from "@chakra-ui/react";
// Import your components
import AddCategory from "./AddCategories";
import AddSubCategories from "./AddSubcategories";
// import AddProduct from "./AddProduct";

const Product = () => {
  const [activeComponent, setActiveComponent] = useState("category");

  const handleButtonClick = (componentName) => {
    setActiveComponent(componentName);
  };

  return (
    <>
      <Flex
        justifyContent={"right"}
        position="relative"
        top="10px"
        right="10px"
        gap="10px"
      >
        <Button
          colorScheme="teal"
          onClick={() => handleButtonClick("category")}
        >
          Add Category
        </Button>
        <Button
          colorScheme="blue"
          onClick={() => handleButtonClick("subcategory")}
        >
          Add SubCategory
        </Button>
        <Button
          colorScheme="purple"
          onClick={() => handleButtonClick("product")}
        >
          Add Product
        </Button>
      </Flex>

      {/* Render different components based on the active component */}
      {activeComponent === "category" && <AddCategory />}
      {activeComponent === "subcategory" && <AddSubCategories />}
      {/* {activeComponent === "product" && <AddProduct />} */}
    </>
  );
};

export default Product;
