import React, { ReactNode } from "react";
import { Flex, Box, Container } from "@chakra-ui/react";

import Header from "../ui/header";

export default function DashboardLayout({
  children,
  isFullWidth = false,
}: {
  children: ReactNode;
  isFullWidth?: boolean;
}) {
  return (
    <>
      <Header />
      <Flex height="100vh" py={10}>
        <Container fluid={isFullWidth}>
          <Box py={5}>{children}</Box>
        </Container>
      </Flex>
    </>
  );
}
