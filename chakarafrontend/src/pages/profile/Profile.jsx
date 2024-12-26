"use client";

import {
  Heading,
  Avatar,
  Box,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  FormHelperText,
  InputRightElement,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { upadteUserService } from "../../services/userServices";
import { useNavigate } from "react-router-dom";

// Validation Schema
const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone Number is required"),
});

export default function Profile() {
  const toast = useToast();
  const currentUser = useSelector((store) => store.user.currentuser);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const response = await upadteUserService(data, currentUser?._id);
    if (response?.status === "success") {
      toast({
        title: "Update created.",
        description: response?.message,
        position: "top-right",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Update not created.",
        description: response?.data,
        position: "top-right",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    reset(currentUser);
  }, []);
  return (
    <Flex
      direction={{ base: "column", lg: "row" }}
      align="flex-start"
      justify="center"
      p={10}
      gap={6}
      bg={useColorModeValue("gray.100", "gray.900")}
      minH="100vh"
    >
      {/* Profile Card */}
      <Box
        flex={{ base: "1", lg: "0 0 30%" }}
        maxW={{ base: "full", lg: "30%" }}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        overflow={"hidden"}
        p={6}
      >
        <Image
          h={"120px"}
          w={"full"}
          src={
            "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
          }
          objectFit="cover"
          alt="Cover"
        />
        <Flex justify={"center"} mt={-12}>
          <Avatar
            size={"xl"}
            src={
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
            }
            css={{
              border: "3px solid white",
            }}
          />
        </Flex>

        <Box p={6} textAlign="center">
          <Heading fontSize={"2xl"} fontWeight={600}>
            {currentUser?.firstName} {currentUser?.lastName}
          </Heading>
          <Text color={"gray.500"}>Admin</Text>

          <Stack
            direction={"row"}
            justify={"center"}
            spacing={6}
            mt={4}
            align="center"
          >
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={700} fontSize={"lg"}>
                Email
              </Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                {currentUser?.email}
              </Text>
            </Stack>
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={700} fontSize={"lg"}>
                Phone Number
              </Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                {currentUser?.phoneNumber}
              </Text>
            </Stack>
          </Stack>

          <Text
            mt={4}
            fontSize={"md"}
            color={useColorModeValue("gray.600", "gray.400")}
            textAlign={"center"}
          >
            Stay updated with John Doe's latest projects and posts by following
            them.
          </Text>
        </Box>
      </Box>

      {/* Registration Form */}
      <Box
        flex={{ base: "1", lg: "0 0 70%" }}
        maxW={{ base: "full", lg: "70%" }}
        bg={useColorModeValue("white", "gray.800")}
        p={8}
        rounded={"lg"}
        boxShadow={"xl"}
      >
        <Heading textAlign="center" fontWeight={"semibold"} mb={6}>
          Profile Details
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex mb={4} gap={4}>
            <FormControl isInvalid={!!errors.firstName}>
              <FormLabel htmlFor="first-name" fontWeight={"normal"}>
                First Name
              </FormLabel>
              <Input
                id="first-name"
                placeholder="John"
                {...register("firstName")}
              />
              <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.lastName}>
              <FormLabel htmlFor="last-name" fontWeight={"normal"}>
                Last Name
              </FormLabel>
              <Input
                id="last-name"
                placeholder="Doe"
                {...register("lastName")}
              />
              <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
            </FormControl>
          </Flex>
          <FormControl isInvalid={!!errors.email} mb={4}>
            <FormLabel htmlFor="email" fontWeight={"normal"}>
              Email Address
            </FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="johndoe@example.com"
              {...register("email")}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.phoneNumber} mb={4}>
            <FormLabel htmlFor="phoneNumber" fontWeight={"normal"}>
              Phone Number
            </FormLabel>
            <Input
              id="phoneNumber"
              type="text"
              placeholder="7788995544"
              {...register("phoneNumber")}
            />
            <FormErrorMessage>{errors.phoneNumber?.message}</FormErrorMessage>
          </FormControl>
          <Button
            type="submit"
            w={"full"}
            mt={6}
            bg={useColorModeValue("green.400", "green.600")}
            color={"white"}
            rounded={"md"}
            _hover={{
              bg: useColorModeValue("green.500", "green.700"),
            }}
          >
            Edit Profile
          </Button>
        </form>
      </Box>
    </Flex>
  );
}
