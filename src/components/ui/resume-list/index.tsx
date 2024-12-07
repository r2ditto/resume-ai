import React from "react";

import { VStack } from "@chakra-ui/react";

import Resume from "./resume";

export default function ResumeList({ resumes }: { resumes: any[] | null }) {
  return (
    <VStack gap={4}>
      {resumes?.map((resume) => (
        <Resume resume={resume} key={resume.id} />
      ))}
    </VStack>
  );
}
