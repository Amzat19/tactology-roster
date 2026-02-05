"use client";

import { Box, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  header?: ReactNode;
  sidebar?: ReactNode;
  children: ReactNode;
}

export default function DashboardLayout({
  header,
  sidebar,
  children,
}: DashboardLayoutProps) {
  return (
    <Flex direction="column" h="100vh" bg="gray.50">
      {/* Top Header */}
      {header && (
        <Box
          h="64px"
          px={6}
          borderBottom="1px solid"
          borderColor="gray.200"
          bg="white"
        >
          {header}
        </Box>
      )}

      {/* Main Content */}
      <Flex flex="1" overflow="hidden">
        {/* Sidebar (optional) */}
        {sidebar && (
          <Box
            w="280px"
            borderRight="1px solid"
            borderColor="gray.200"
            bg="white"
            overflowY="auto"
          >
            {sidebar}
          </Box>
        )}

        {/* Page Content */}
        <Box flex="1" overflow="auto">
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}
