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
    <Flex direction="row" h="100vh" bg="gray.50">
      {sidebar && (
        <Box
          w="260px"
          borderRight="1px solid"
          borderColor="gray.200"
          bg="white"
          overflowY="auto"
        >
          {sidebar}
        </Box>
      )}

      <Flex flex="1" direction={"column"} overflow="hidden">
        {header && (
          <Box
            h="64px"
            px={6}
            py={12}
            borderBottom="1px solid"
            borderColor="gray.200"
            bg="white"
          >
            {header}
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
