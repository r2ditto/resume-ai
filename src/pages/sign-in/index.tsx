import React, { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/utils/supabase";

import { Box, Button, Container, Input, Text, VStack } from "@chakra-ui/react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // TODO: use try catch, error handling
  const handleSignIn = async () => {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(error);
    } else {
      console.log(data);
      router.push("/dashboard");
    }
  };

  return (
    <Container
      centerContent
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box w="500px" p={10}>
        <VStack marginBottom={5}>
          <Text
            as="h1"
            fontFamily="Arial"
            fontSize="50px"
            fontWeight="bolder"
            letterSpacing={-0.75}
          >
            Sign In
          </Text>
          <Text>Good to see you again! Welcome back</Text>
        </VStack>

        <VStack gap={5}>
          <Box w="full">
            <Text>Email</Text>
            <Input
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </Box>

          <Box w="full">
            <Text>Password</Text>
            <Input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </Box>

          <Button w="full" onClick={handleSignIn}>
            Sign In
          </Button>
        </VStack>
      </Box>
    </Container>
  );
}
