import React, { useCallback, useState } from "react";
import { Heading, Input, SimpleGrid, Text } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { supabase } from "@/utils/supabase";
import { debounce } from "@/utils/helper";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useUser } from "@/contexts/UserContext";
import { useMutation } from "@tanstack/react-query";

// TODO: Optimistic updates, Error handling, Loading state
export default function PersonalDetailsForm({
  resumeId,
  resumeData,
}: {
  resumeId: string;
  resumeData: any;
}) {
  const [firstName, setFirstName] = useState(
    resumeData?.personal_info?.firstName
  );
  const [lastName, setLastName] = useState(resumeData?.personal_info?.lastName);
  const [jobTitle, setJobTitle] = useState(resumeData?.personal_info?.jobTitle);
  const { user } = useUser();
  // const { data, error, isLoading } = useQuery({
  //   queryKey: ["resumeData", resumeId, user?.id],
  //   queryFn: async () => {
  //     const { data } = await supabase
  //       .from("resumes")
  //       .select("personal_info")
  //       .eq("id", resumeId)
  //       .eq("user_id", user?.id)
  //       .single();
  //     return data;
  //   },
  // });

  // useEffect(() => {
  //   if (data) {
  //     setFirstName(data.personal_info.firstName);
  //     setLastName(data.personal_info.lastName);
  //     setJobTitle(data.personal_info.jobTitle);
  //   }
  // }, [data]);

  const mutation = useMutation({
    mutationFn: async (data: {
      firstName: string;
      lastName: string;
      jobTitle: string;
    }) => {
      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase
        .from("resumes")
        .update({ personal_info: data })
        .eq("id", resumeId)
        .eq("user_id", user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      toaster.create({
        title: "Personal details updated successfully",
        type: "success",
      });
    },
    onError: (error) => {
      console.error(error);
      toaster.create({
        title: "Error updating personal details",
        type: "error",
      });
    },
  });

  // TODO: Fix debounced mutation
  const debouncedMutate = useCallback(
    debounce((data) => mutation.mutate(data), 1000),
    [mutation]
  );

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFirstName(value);
    debouncedMutate({ firstName: value, lastName, jobTitle });
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLastName(value);
    debouncedMutate({ firstName, lastName: value, jobTitle });
  };

  const handleJobTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setJobTitle(value);
    debouncedMutate({ firstName, lastName, jobTitle: value });
  };

  // if (isLoading) return <div>Loading...</div>;

  // if (error) return <div>Error: {error.message}</div>;

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

      <Toaster />
    </>
  );
}
