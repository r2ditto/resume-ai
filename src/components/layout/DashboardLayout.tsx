import React, { ReactNode } from "react";
import { Flex, Box } from "@chakra-ui/react";

import Header from "../ui/header";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <Flex height="100vh">
        {/* Main Content */}
        <Box flex="1" p={4}>
          <Box bg="gray.100" p={4} borderRadius="md">
            {children}
          </Box>
        </Box>
      </Flex>
    </>
  );
}
