import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TableComponent from "../../component/TableComponent";
import {
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  Flex,
  Select,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import {
  addSubCategoriesService,
  subCategoriesService,
} from "../../services/productService";
const config = {
  showView: false,
  showEdit: false,
  showDelete: true,
};

// Define the validation schema using Yup
const schema = yup.object().shape({
  subCategoryName: yup.string().required("Category name is required"),
  description: yup.string().required("Description is required"),
  category: yup.string(),
});

function AddSubCategories() {
  const categoryData = useSelector((store) => store.product.categories);
  const allSubCategories = useSelector((store) => store.product.subCategory);
  console.log("categoryData", categoryData);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const response = await addSubCategoriesService(data);
    subCategoriesService();
    reset();
  };
  const filteredData = allSubCategories?.map((item) => ({
    subCategoryName: item.subCategoryName,
    description: item.description,
  }));

  const handleEdit = (id) => {
    console.log("Editing row with ID:", id);
    // Handle the edit functionality here
  };

  const handleView = (id) => {
    console.log("Viewing row with ID:", id);
    // Handle the view functionality here
  };

  const handleDelete = (id) => {
    console.log("Viewing row with ID:", id);
  };
  console.log(categoryData, "dsds");
  return (
    <Flex direction={{ base: "column", md: "row" }} gap="6" p="6">
      <Box flex="1">
        <TableComponent
          data={filteredData}
          config={config}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleView={handleView}
        />
      </Box>

      <Box
        maxWidth="500px"
        mx="auto"
        mt={{ base: "20px", md: "0" }}
        p="6"
        boxShadow="lg"
        borderRadius="lg"
        bg="white"
        width="full"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.subCategoryName}>
            <FormLabel htmlFor="name" fontWeight="bold" fontSize="lg">
              Category Name
            </FormLabel>
            <Input
              id="name"
              placeholder="Enter category name"
              {...register("subCategoryName")}
              size="lg"
            />
            <FormErrorMessage>
              {errors.subCategoryName?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl mt="6" isInvalid={!!errors.description}>
            <FormLabel htmlFor="description" fontWeight="bold" fontSize="lg">
              Description
            </FormLabel>
            <Textarea
              id="description"
              placeholder="Enter category description"
              {...register("description")}
              size="lg"
            />
            <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
          </FormControl>
          <FormControl mt="6" isInvalid={!!errors.category}>
            <FormLabel htmlFor="category" fontWeight="bold" fontSize="lg">
              Category
            </FormLabel>
            <Select
              id="category"
              placeholder="Select a category"
              {...register("category", { required: "Category is required" })} // Register the field with validation
              size="lg"
            >
              {categoryData.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.categoryName} {/* Display category name */}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{errors.category?.message}</FormErrorMessage>
          </FormControl>

          <Button
            mt="6"
            colorScheme="teal"
            type="submit"
            width="full"
            size="lg"
          >
            Submit
          </Button>
        </form>
      </Box>
    </Flex>
  );
}

export default AddSubCategories;
