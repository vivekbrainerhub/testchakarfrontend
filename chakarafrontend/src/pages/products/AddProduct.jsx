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
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
    imageUrl: yup.string().url("Please enter a valid image URL"),
    discountPercentage: yup
      .number()
      .min(0, "Discount cannot be negative")
      .max(100, "Discount cannot be more than 100")
      .required("Discount percentage is required"),
  })
  .required();

const AddProduct = () => {
  const toast = useToast();
  const [discountedPrice, setDiscountedPrice] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle form submission
  const onSubmit = (data) => {
    const payload = {
      imageUrl: data?.imageUrl,
      discountPercentage: data?.discountPercentage,
      category: data?.category,
      description: data?.description,
      price: data?.price,
      productName: data?.productName,
      actualSellingPrice: discountedPrice, // `discountedPrice` is being correctly referenced here
    };

    console.log("Form submitted with data: ", payload);

    toast({
      title: "Product added",
      description: "Your product has been added successfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
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

  return (
    <Box
      maxW="500px"
      mx="auto"
      mt={10}
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

          {/* Discounted Price */}
          {discountedPrice !== null && (
            <FormControl>
              <FormLabel htmlFor="discountedPrice">Discounted Price</FormLabel>
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
                <Select id="category" placeholder="Select category" {...field}>
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion</option>
                  <option value="home">Home</option>
                  <option value="beauty">Beauty</option>
                </Select>
              )}
            />
            {errors.category && (
              <Box color="red.500" fontSize="sm">
                {errors.category.message}
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
  );
};

export default AddProduct;
