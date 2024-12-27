import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  useToast,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
import {
  addProductService,
  getProductService,
} from "../../services/productService";
import TableComponent from "../../component/TableComponent";
const config = {
  showView: true,
  showEdit: true,
  showDelete: true,
};

// Validation schema using Yup
const schema = yup
  .object({
    productName: yup.string().required("Product name is required"),
    price: yup
      .number()
      .typeError("Price must be a number")
      .positive("Price must be greater than 0")
      .required("Price is required"),
    description: yup.string().required("Product description is required"),
    category: yup.string().required("Category is required"),
    subCategory: yup.string().required("Sub Category is required"),
    imageUrl: yup.string().url("Please enter a valid image URL"),
    discountPercentage: yup
      .number()
      .min(0, "Discount cannot be negative")
      .max(100, "Discount cannot be more than 100")
      .required("Discount percentage is required"),
      stock: yup
      .number()
      .typeError("Stock must be a number")
      .positive("Stock must be greater than 0")
      .required("Stock is required"),
  })
  .required();

const AddProduct = () => {
  const toast = useToast();
  const [discountedPrice, setDiscountedPrice] = useState(null);
  const categoryData = useSelector((store) => store.product.categories);
  const allSubCategories = useSelector((store) => store.product.subCategory);
  const allproduct = useSelector((store) => store.product.product);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle form submission
  const onSubmit = async (data) => {
    const payload = {
      imageUrl: data?.imageUrl,
      discountPercentage: data?.discountPercentage,
      category: data?.category,
      description: data?.description,
      price: data?.price,
      productName: data?.productName,
      actualSellingPrice: discountedPrice,
      subCategory: data?.subCategory,
      stock:data?.stock
    };

    const response = await addProductService(payload);
    if (response?.status === "success") {
      toast({
        title: "Product Added",
        description: response?.message,
        position: "top-right",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      getProductService();
    } else {
      toast({
        title: "failed to add product",
        description: response?.data,
        position: "top-right",
        status: "error",
        duration: 9000,
        isClosable: true,
      });

      reset();
    }
  };

  // Watch the price and discountPercentage fields to calculate discounted price
  const price = watch("price");
  const discountPercentage = watch("discountPercentage");

  // Calculate the discounted price when price or discount percentage changes
  React.useEffect(() => {
    if (price && discountPercentage !== undefined) {
      const calculatedDiscountedPrice =
        price - (price * discountPercentage) / 100;
      setDiscountedPrice(calculatedDiscountedPrice);
    }
  }, [price, discountPercentage]);

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

  const filteredData = allproduct?.map((item) => ({
    productName: item?.productName,
    description: item?.description,
    actualPrice: item?.actualSellingPrice,
    discount: item?.discountPercentage,
    price: item?.price,
    categoryName: item?.category?.categoryName,
    subCategoryName: item?.subCategory?.subCategoryName,
    stock:item?.stock
  }));

  return (
    <Flex direction={{ base: "column", md: "row" }} gap="6" p="6">
      <Box flex="10" maxWidth={"75%"}>
        {" "}
        {/* Table takes 60% */}
        <TableComponent
          data={filteredData}
          config={config}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleView={handleView}
        />
      </Box>
      <Box
        flex="2" /* Form takes 40% */
        maxW="500px"
        mx="auto"
        mt={{ base: 10, md: 0 }} /* Adjust margin for responsive view */
        p={6}
        borderWidth={1}
        borderRadius="md"
        shadow="lg"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4} align="stretch">
            {/* Product Name */}
            <FormControl isInvalid={!!errors.productName}>
              <FormLabel htmlFor="productName">Product Name</FormLabel>
              <Controller
                name="productName"
                control={control}
                render={({ field }) => (
                  <Input
                    id="productName"
                    placeholder="Enter product name"
                    {...field}
                  />
                )}
              />
              {errors.productName && (
                <Box color="red.500" fontSize="sm">
                  {errors.productName.message}
                </Box>
              )}
            </FormControl>

            {/* Price */}
            <FormControl isInvalid={!!errors.price}>
              <FormLabel htmlFor="price">Price</FormLabel>
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <Input
                    id="price"
                    placeholder="Enter product price"
                    type="number"
                    {...field}
                  />
                )}
              />
              {errors.price && (
                <Box color="red.500" fontSize="sm">
                  {errors.price.message}
                </Box>
              )}
            </FormControl>

            {/* Discount Percentage */}
            <FormControl isInvalid={!!errors.discountPercentage}>
              <FormLabel htmlFor="discountPercentage">
                Discount Percentage
              </FormLabel>
              <Controller
                name="discountPercentage"
                control={control}
                render={({ field }) => (
                  <Input
                    id="discountPercentage"
                    placeholder="Enter discount percentage"
                    type="number"
                    {...field}
                  />
                )}
              />
              {errors.discountPercentage && (
                <Box color="red.500" fontSize="sm">
                  {errors.discountPercentage.message}
                </Box>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors.stock}>
              <FormLabel htmlFor="stock">
               Stock
              </FormLabel>
              <Controller
                name="stock"
                control={control}
                render={({ field }) => (
                  <Input
                    id="stock"
                    placeholder="Enter Stock"
                    type="number"
                    {...field}
                  />
                )}
              />
              {errors.stock && (  
                <Box color="red.500" fontSize="sm">
                  {errors.stock.message}
                </Box>
              )}
            </FormControl>

            {/* Discounted Price */}
            {discountedPrice !== null && (
              <FormControl>
                <FormLabel htmlFor="discountedPrice">
                  Discounted Price
                </FormLabel>
                <Input
                  id="discountedPrice"
                  value={`$${discountedPrice.toFixed(2)}`}
                  isReadOnly
                />
              </FormControl>
            )}

            {/* Description */}
            <FormControl isInvalid={!!errors.description}>
              <FormLabel htmlFor="description">Product Description</FormLabel>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    id="description"
                    placeholder="Enter product description"
                    {...field}
                  />
                )}
              />
              {errors.description && (
                <Box color="red.500" fontSize="sm">
                  {errors.description.message}
                </Box>
              )}
            </FormControl>

            {/* Category */}
            <FormControl isInvalid={!!errors.category}>
              <FormLabel htmlFor="category">Category</FormLabel>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    id="category"
                    placeholder="Select category"
                    {...field}
                  >
                    {categoryData.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.categoryName}
                      </option>
                    ))}
                  </Select>
                )}
              />
              {errors.category && (
                <Box color="red.500" fontSize="sm">
                  {errors.category.message}
                </Box>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors.subCategory}>
              <FormLabel htmlFor="subCategory">Sub Category</FormLabel>
              <Controller
                name="subCategory"
                control={control}
                render={({ field }) => (
                  <Select
                    id="subCategory"
                    placeholder="Select Sub Category"
                    {...field}
                  >
                    {allSubCategories?.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.subCategoryName}
                      </option>
                    ))}
                  </Select>
                )}
              />
              {errors.subCategory && (
                <Box color="red.500" fontSize="sm">
                  {errors.subCategory.message}
                </Box>
              )}
            </FormControl>

            {/* Image URL */}
            <FormControl isInvalid={!!errors.imageUrl}>
              <FormLabel htmlFor="imageUrl">Image URL</FormLabel>
              <Controller
                name="imageUrl"
                control={control}
                render={({ field }) => (
                  <Input
                    id="imageUrl"
                    placeholder="Enter product image URL"
                    {...field}
                  />
                )}
              />
              {errors.imageUrl && (
                <Box color="red.500" fontSize="sm">
                  {errors.imageUrl.message}
                </Box>
              )}
            </FormControl>

            {/* Submit Button */}
            <Button type="submit" colorScheme="blue" width="full">
              Add Product
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default AddProduct;
