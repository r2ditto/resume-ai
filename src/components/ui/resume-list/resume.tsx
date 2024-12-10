import React from "react";
import { useRouter } from "next/router";

import { Card, Box, Heading, Text, Flex, VStack } from "@chakra-ui/react";

import { TbEdit } from "react-icons/tb";
import { TbCopy } from "react-icons/tb";
import { TbTrash } from "react-icons/tb";

export default function Resume({ resume }: { resume: any }) {
  const router = useRouter();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(resume.updated_at));

  const handleEdit = () => {
    router.push(`/resumes/${resume.id}`);
  };

  return (
    <Card.Root w="full" borderRadius="xl" bg="gray.100" border="none">
      <Card.Body display="flex" flexDirection="row">
        <Box flex="3 1 0%">
          <Box>
            <Heading as="h1" size="5xl" fontWeight="bold">
              {resume.title}
            </Heading>
            <Text color="gray.500">Updated at {formattedDate}</Text>
          </Box>

          <VStack marginTop={12} gap={8} alignItems="flex-start">
            <Flex
              as="button"
              fontSize="25px"
              alignItems="center"
              gap={2}
              fontWeight="500"
              onClick={handleEdit}
            >
              <TbEdit size="30px" /> Edit
            </Flex>

            <Flex
              as="button"
              fontSize="25px"
              alignItems="center"
              gap={2}
              fontWeight="500"
            >
              <TbCopy size="30px" /> Copy
            </Flex>

            <Flex
              as="button"
              fontSize="25px"
              alignItems="center"
              gap={2}
              fontWeight="500"
            >
              <TbTrash size="30px" /> Delete
            </Flex>
          </VStack>
        </Box>

        <Box flex="2 1 0%">
          <Card.Title>Resume Preview</Card.Title>
        </Box>
      </Card.Body>
    </Card.Root>
  );
}
