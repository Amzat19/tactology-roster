"use client";

import { Box, Flex, Text, VStack, HStack, IconButton } from "@chakra-ui/react";
import {
  Grid2,
  Calendar,
  ClipboardText,
  Folder,
  Book,
  Notification,
  HambergerMenu,
  ArrowDown2,
  DocumentText,
} from "iconsax-react";
import Image from "next/image";

const navItems = [
  {
    label: "Startpagina",
    icon: Grid2,
  },
  {
    label: "Rooster",
    icon: Calendar,
    expanded: true,
    children: [
      { label: "Mijn Rooster", icon: DocumentText },
      { label: "Planner", icon: DocumentText, active: true },
      { label: "Instellingen", icon: DocumentText },
    ],
  },
  { label: "My to do Protocols", icon: ClipboardText },
  { label: "Document Management", icon: Folder },
  { label: "Department News", icon: Notification },
  { label: "Knowledge Base", icon: Book },
  { label: "General News", icon: Book },
];

export default function Sidebar() {
  return (
    <Box px={4} py={6}>
      {/* Logo */}
      <Flex align="center" justify="space-between" mb={8}>
        <Image
          src="/assets/excellent-care-clinics-logo.png"
          alt="Logo"
          width={156}
          height={38}
        />
        <IconButton aria-label="Menu" variant="outline" size="md">
          <HambergerMenu size={20} variant="Linear" color="black" />
        </IconButton>
      </Flex>

      {/* Navigation */}
      <VStack align="stretch" gap={1}>
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <Box key={item.label}>
              {/* Parent item */}
              <HStack
                py={2}
                px={2}
                borderRadius="md"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
                justify="space-between"
              >
                <HStack gap={2}>
                  {Icon && <Icon size={18} variant="Linear" color="black" />}
                  <Text
                    fontSize="sm"
                    fontFamily="body"
                    color={item.expanded ? "#242424" : "#4E5D69"}
                    fontWeight={item.expanded ? 600 : 500}
                  >
                    {item.label}
                  </Text>
                </HStack>

                {/* Caret for expandable parent */}
                {item.children && (
                  <ArrowDown2
                    size={14}
                    variant="Linear"
                    style={{
                      transform: item.expanded
                        ? "rotate(0deg)"
                        : "rotate(-90deg)",
                      transition: "transform 0.15s ease",
                    }}
                    color="black"
                  />
                )}
              </HStack>

              {/* Sub navigation */}
              {item.children && item.expanded && (
                <VStack align="stretch" mt={1} pl={6} gap={1}>
                  {item.children.map((child) => {
                    const ChildIcon = child.icon;

                    return (
                      <HStack
                        key={child.label}
                        position="relative"
                        py={1.5}
                        px={2}
                        borderRadius="md"
                        cursor="pointer"
                        bg={child.active ? "gray.50" : "transparent"}
                        _hover={{ bg: "gray.100" }}
                      >
                        {/* Active vertical indicator */}
                        {child.active && (
                          <Box
                            position="absolute"
                            left="-12px"
                            top="0"
                            bottom="0"
                            w="2px"
                            bg="brand.600"
                            borderRadius="full"
                          />
                        )}

                        {/* Child icon */}
                        {ChildIcon && (
                          <ChildIcon
                            size={16}
                            variant="Linear"
                            color={child.active ? "#5653FC" : "#242424"}
                          />
                        )}

                        <Text
                          fontSize="sm"
                          fontFamily="body"
                          fontWeight={500}
                          color={child.active ? "#5653FC" : "#4E5D69"}
                        >
                          {child.label}
                        </Text>
                      </HStack>
                    );
                  })}
                </VStack>
              )}
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
}
