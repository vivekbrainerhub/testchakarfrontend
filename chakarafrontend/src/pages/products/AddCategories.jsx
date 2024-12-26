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
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import {
  addCategoriesService,
  categoriesService,
} from "../../services/productService";
import { store } from "../../redux/store";
import { setCategories } from "../../redux/slice/productSlice";
const config = {
  showView: false,
  showEdit: false,
  showDelete: true,
};

// Define the validation schema using Yup
const schema = yup.object().shape({
  categoryName: yup.string().required("Category name is required"),
  description: yup.string().required("Description is required"),
});

function AddCategories() {
  const categoryData = useSelector((store) => store.product.categories);
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
    const response = await addCategoriesService(data);
    categoriesService();
    reset(); // Reset form after submission
  };
  const filteredData = categoryData?.map((item) => ({
    categoryName: item.categoryName,
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
          <FormControl isInvalid={!!errors.categoryName}>
            <FormLabel htmlFor="name" fontWeight="bold" fontSize="lg">
              Category Name
            </FormLabel>
            <Input
              id="name"
              placeholder="Enter category name"
              {...register("categoryName")}
              size="lg"
            />
            <FormErrorMessage>{errors.categoryName?.message}</FormErrorMessage>
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

export default AddCategories;
