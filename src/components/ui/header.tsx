import React from "react";
import Image from "next/image";
import { Icon } from "@chakra-ui/react";

import { IoAdd } from "react-icons/io5";
import { Container, Flex, Button, Group } from "@chakra-ui/react";

import Logo from "/public/logo.svg";

const MainButtons = ["Resume", "Cover Letter", "Create"];

export default function Header() {
  return (
    <Container fluid px={6} py={4}>
      <Flex>
        <Image src={Logo} alt="Logo" width={40} height={40} />

        <Flex justify="space-between" flex={1}>
          <Group gap={5} px={4}>
            {MainButtons.map((label) => (
              <Button
                key={label}
                variant={label === "Create" ? "solid" : "ghost"}
                size="xl"
                borderRadius="full"
                fontSize={25}
                fontWeight={500}
                gap={1}
              >
                {label === "Create" && (
                  <Icon size="xl">
                    <IoAdd />
                  </Icon>
                )}
                {label}
              </Button>
            ))}
          </Group>

          <Group>
            <Button
              variant="ghost"
              size="xl"
              borderRadius="full"
              fontSize={25}
              fontWeight={500}
            >
              User
            </Button>
          </Group>
        </Flex>
      </Flex>
    </Container>
  );
}
