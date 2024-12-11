import React, { useCallback, useEffect, useState } from "react";
import { Heading, Input, SimpleGrid, Text } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { supabase } from "@/utils/supabase";
import { debounce } from "@/utils/helper";
import { useUser } from "@/contexts/UserContext";

export default function PersonalDetailsForm({
  resumeId,
}: {
  resumeId: string;
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await supabase
          .from("resumes")
          .select("personal_info")
          .eq("id", resumeId)
          .eq("user_id", user?.id)
          .single();

        if (data) {
          setFirstName(data.personal_info.firstName);
          setLastName(data.personal_info.lastName);
          setJobTitle(data.personal_info.jobTitle);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [resumeId, user?.id]);

  const saveToSupabase = useCallback(
    debounce(async (data) => {
      if (!user) return;
      try {
        const { error } = await supabase
          .from("resumes")
          .update({ personal_info: data })
          .eq("id", resumeId)
          .eq("user_id", user.id);
        if (error) throw error;
        console.log("Data saved successfully");
      } catch (error) {
        console.error("Error saving data:", error);
      }
    }, 1000),
    [resumeId, user?.id]
  );

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFirstName(value);
    saveToSupabase({ firstName: value, lastName, jobTitle });
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLastName(value);
    saveToSupabase({ firstName, lastName: value, jobTitle });
  };

  const handleJobTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setJobTitle(value);
    saveToSupabase({ firstName, lastName, jobTitle: value });
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
