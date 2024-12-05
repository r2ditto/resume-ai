import React from "react";
import Image from "next/image";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";

import { IoAdd } from "react-icons/io5";
import {
  Container,
  Flex,
  Button,
  Group,
  Icon,
  VStack,
  Separator,
} from "@chakra-ui/react";

import Logo from "/public/logo.svg";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/router";

const MainButtons = ["Resume", "Cover Letter", "Create"];

export default function Header() {
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/sign-in");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = async () => {
    try {
      const { data, error } = await supabase
        .from("resumes")
        .insert([
          {
            title: "Untitled Resume",
            template_id: "default",
            personal_info: {},
            sections: {},
          },
        ])
        .select("id")
        .single();

      if (error) throw error;

      router.push(`/resumes/${data.id}`);
    } catch (error) {
      console.error("Error creating resume:", error);
    }
  };

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
                onClick={label === "Create" ? handleCreate : undefined}
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
            <MenuRoot positioning={{ placement: "bottom-end" }}>
              <MenuTrigger asChild>
                <Button
                  variant="ghost"
                  borderRadius="full"
                  size="xl"
                  fontSize={25}
                  fontWeight={500}
                >
                  User
                </Button>
              </MenuTrigger>
              <MenuContent px={3} py={5} borderRadius={10} minW={300}>
                <VStack gap={3}>
                  <MenuItem value="account" fontSize={20}>
                    Account
                  </MenuItem>
                  <Separator />
                  <MenuItem value="settings" fontSize={20}>
                    Settings
                  </MenuItem>
                  <Separator />
                  <MenuItem value="logout" fontSize={20} onClick={handleLogOut}>
                    Log out
                  </MenuItem>
                </VStack>
              </MenuContent>
            </MenuRoot>
          </Group>
        </Flex>
      </Flex>
    </Container>
  );
}
