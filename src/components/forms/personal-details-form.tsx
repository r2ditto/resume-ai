import React, { useEffect, useState } from "react";
import { Heading, Input, SimpleGrid, Text } from "@chakra-ui/react";
import { Field } from "../ui/field";

export default function PersonalDetailsForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      updatePersonalDetails();
    }, 1000);

    return () => clearTimeout(handler);
  }, [firstName, lastName, jobTitle]);

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleJobTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobTitle(e.target.value);
  };

  const updatePersonalDetails = () => {
    console.log("Updating personal details...");
  };

  return (
    <>
      <Heading size="3xl">Personal Details</Heading>
      <Text fontSize="lg" color="gray.500" my="2">
        Including personal details like your name and job title in a resume is
        crucial for providing recruiters with a quick snapshot of your profile.
      </Text>

      <SimpleGrid columns={2} gap={4} mt={4}>
        <Field label="First Name">
          <Input
            placeholder="First Name"
            size="xl"
            onChange={handleFirstNameChange}
            value={firstName}
          />
        </Field>
        <Field label="Last Name">
          <Input
            placeholder="Last Name"
            size="xl"
            onChange={handleLastNameChange}
            value={lastName}
          />
        </Field>
        <Field label="Job Title">
          <Input
            placeholder="Job Title"
            size="xl"
            onChange={handleJobTitleChange}
            value={jobTitle}
          />
        </Field>
      </SimpleGrid>
    </>
  );
}
