import React from "react";
import { Heading, Text, SimpleGrid, Input } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { Toaster } from "@/components/ui/toaster";

export default function ContactInformationForm() {
  return (
    <>
      <Heading size="3xl">Contact Information</Heading>
      <Text fontSize="lg" color="gray.500" my="2">
        Including your contacts in your resume is crucial so potential employers
        can easily get in touch with you.
      </Text>

      <SimpleGrid columns={2} gap={4} mt={4}>
        <Field label="First Name">
          <Input
            placeholder="First Name"
            size="xl"
            // onChange={handleFirstNameChange}
            // value={firstName}
          />
        </Field>
        <Field label="Last Name">
          <Input
            placeholder="Last Name"
            size="xl"
            // onChange={handleLastNameChange}
            // value={lastName}
          />
        </Field>
        <Field label="Job Title">
          <Input
            placeholder="Job Title"
            size="xl"
            // onChange={handleJobTitleChange}
            // value={jobTitle}
          />
        </Field>
      </SimpleGrid>

      <Toaster />
    </>
  );
}
