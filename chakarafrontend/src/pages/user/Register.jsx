"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { registerService } from "../../services/userServices";

// Validation schema
const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  phoneNumber: yup.string().required("Phone Number is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const response = await registerService(data);
    if (response?.status === "success") {
      toast({
        title: "Account created.",
        description:response?.message,
        position: 'top-right',
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Account not created.",
        description:response?.data,
        position: 'top-right',
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl
                    id="firstName"
                    isInvalid={errors.firstName}
                    isRequired
                  >
                    <FormLabel>First Name</FormLabel>
                    <Input type="text" {...register("firstName")} />
                    <Text color="red.500" fontSize="sm">
                      {errors.firstName?.message}
                    </Text>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl
                    id="lastName"
                    isInvalid={errors.lastName}
                    isRequired
                  >
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" {...register("lastName")} />
                    <Text color="red.500" fontSize="sm">
                      {errors.lastName?.message}
                    </Text>
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isInvalid={errors.email} isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" {...register("email")} />
                <Text color="red.500" fontSize="sm">
                  {errors.email?.message}
                </Text>
              </FormControl>
              <FormControl
                id="phomeNumber"
                isInvalid={errors.phoneNumber}
                isRequired
              >
                <FormLabel>Phone Number</FormLabel>
                <Input type="text" {...register("phoneNumber")} />
                <Text color="red.500" fontSize="sm">
                  {errors.phoneNumber?.message}
                </Text>
              </FormControl>
              <FormControl id="password" isInvalid={errors.password} isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <Text color="red.500" fontSize="sm">
                  {errors.password?.message}
                </Text>
              </FormControl>
              <FormControl
                id="confirmPassword"
                isInvalid={errors.confirmPassword}
                isRequired
              >
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword")}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowConfirmPassword(
                          (showConfirmPassword) => !showConfirmPassword
                        )
                      }
                    >
                      {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <Text color="red.500" fontSize="sm">
                  {errors.confirmPassword?.message}
                </Text>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user? <Link color={"blue.400"}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
