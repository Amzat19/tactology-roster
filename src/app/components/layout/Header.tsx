"use client";

import { Flex, HStack, Text, IconButton, Avatar, Box } from "@chakra-ui/react";
import { Category, Setting2, Notification, ArrowDown2 } from "iconsax-react";

export default function Header() {
  return (
    <Flex h="100%" align="center" justify="space-between" px={4}>
      <Box />

      {/* Right actions */}
      <HStack gap={5}>
        <IconButton aria-label="Apps" variant="subtle" size="md">
          <Category size={20} color="#009FE3" />
        </IconButton>

        <IconButton aria-label="Settings" variant="subtle" size="md">
          <Setting2 size={20} color="black" />
        </IconButton>

        <IconButton aria-label="Notifications" variant="subtle" size="md">
          <Notification size={20} color="black" />
        </IconButton>

        <HStack gap={6}>
          <Avatar.Root size="sm">
            <Avatar.Image src="/avatar.png" />
            <Avatar.Fallback name="Paul Cornelius" />
          </Avatar.Root>
          <Box>
            <Text fontFamily="body" fontSize="sm" fontWeight="500">
              Paul Cornelius
            </Text>
            <Text fontFamily="body" fontSize="xs" color="gray.500">
              paul@distract.com
            </Text>
          </Box>
          <ArrowDown2 size={20} color="black" />
        </HStack>
      </HStack>
    </Flex>
  );
}
