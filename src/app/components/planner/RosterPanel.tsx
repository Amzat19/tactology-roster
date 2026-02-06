"use client";

import {
  Box,
  Text,
  VStack,
  HStack,
  Input,
  IconButton,
  Badge,
} from "@chakra-ui/react";
import { SearchNormal1, Filter } from "iconsax-react";
import { BiExpand } from "react-icons/bi";

const rosterData = [
  {
    id: 1,
    name: "Elijah Oyin",
    initials: "EO",
    hours: "1158.0hrs",
    weekly: "38.0hrs",
    status: "On leave",
    date: "Jan 8 - Jan 15",
  },
  {
    id: 2,
    name: "Diane Lane",
    initials: "DL",
    hours: "1158.0hrs",
    weekly: "38.0hrs",
    status: "On leave",
    date: "Jan 12 - Jan 28",
  },
  {
    id: 3,
    name: "Elijah Oyin",
    initials: "EO",
    hours: "1158.0hrs",
    weekly: "38.0hrs",
    status: "On leave",
    date: "Jan 12 - Jan 20",
  },
  {
    id: 4,
    name: "Haico De Gast",
    initials: "HG",
    hours: "1158.0hrs",
    weekly: "38.0hrs",
    status: "On leave",
    date: "Jan 2 - Jan 9",
  },
];

export default function RosterPanel() {
  return (
    <Box
      w="320px"
      border="2px solid #F3F4F6"
      borderRadius={"16px"}
      px={4}
      py={4}
      bg="white"
      fontFamily="body"
    >
      {/* Header */}
      <HStack gap={2} mb={4}>
        <BiExpand />
        <Text fontSize="lg" fontWeight={700} color="#242424">
          Roster
        </Text>
      </HStack>

      {/* Search */}
      <HStack mb={4} gap={2}>
        <HStack px={3} border="1px solid #E6EDF5" borderRadius="md" bg="white">
          <SearchNormal1 size={16} color="#7E919F" />
          <Input
            variant="subtle"
            placeholder="Search"
            fontSize="sm"
            bg={"white"}
          />
        </HStack>

        <IconButton aria-label="Filter" variant="outline" borderColor="#E6EDF5">
          <Filter size={18} color="black" />
        </IconButton>
      </HStack>

      {/* Tabs */}
      <HStack gap={4} mb={4} fontSize="xs" fontWeight={600}>
        <Text color="#7E919F">All 32</Text>
        <Text color="#7E919F">Available 30</Text>
        <Box>
          <Text color="#3182CE">On Leave 4</Text>
          <Box h="2px" bg="#3182CE" borderRadius="full" mt="2px" />
        </Box>
      </HStack>

      {/* List */}
      <VStack gap={3} align="stretch">
        {rosterData.map((user) => (
          <Box
            key={user.id}
            border="1px solid #E6EDF5"
            borderRadius="lg"
            p={3}
            fontSize="xs"
          >
            <HStack align="flex-start" gap={1}>
              {/* Avatar */}
              <Box
                w="32px"
                h="32px"
                borderRadius="full"
                bg="#EDF2F7"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontWeight={600}
                color="#4A5568"
                p={4}
              >
                {user.initials}
              </Box>

              {/* Info */}
              <Box flex="1">
                <HStack justify="space-between" mb={1}>
                  <Text fontWeight={600} fontSize={"sm"}>
                    {user.name}
                  </Text>
                </HStack>

                <HStack gap={2} mb={1}>
                  <Badge
                    fontWeight={500}
                    fontSize="10px"
                    bg={"#F0F5FA"}
                    color={"#4E5D69"}
                    px={1}
                    borderRadius={"6px"}
                  >
                    {user.hours}
                  </Badge>
                  <Badge
                    fontWeight={500}
                    fontSize="10px"
                    bg={"#F0F5FA"}
                    color={"#4E5D69"}
                    px={1}
                    borderRadius={"6px"}
                  >
                    {user.weekly}
                  </Badge>
                </HStack>

                <Badge
                  fontWeight={500}
                  fontSize="10px"
                  bg={"#FEECEC"}
                  color={"#EF2E2E"}
                  px={1}
                  borderRadius={"6px"}
                >
                  {user.date}
                </Badge>
              </Box>

              <VStack justifySelf={"center"} alignSelf={"end"}>
                <Badge
                  variant="subtle"
                  bg={"#FEECEC"}
                  color={"#EF2E2E"}
                  fontSize="10px"
                  fontWeight={500}
                  borderRadius={"16px"}
                  px={3}
                  py={1}
                  justifySelf={"end"}
                  alignSelf={"end"}
                >
                  On leave
                </Badge>
                <HStack gap={1}>
                  {["m", "t", "w", "do", "vr"].map((d) => (
                    <Box
                      key={d}
                      px={1.5}
                      py={0.5}
                      fontSize="9px"
                      borderRadius="sm"
                      bg="#EBFFEF"
                      color="#37A55C"
                    >
                      {d}
                    </Box>
                  ))}
                </HStack>
              </VStack>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
