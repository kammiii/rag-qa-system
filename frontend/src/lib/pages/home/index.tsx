import { UploadBox } from "@/components/features/upload-box";
import { ChatBox } from "@/components/features/chat-box";
import { Container, Heading, VStack } from "@chakra-ui/react";

export default function HomePage() {
  return (
    <Container py={10}>
      <VStack spacing={10} align="center" w="100%">
        <Heading textAlign="center">🧠 RAG Q&A Assistant</Heading>
        <UploadBox />
        <ChatBox />
      </VStack>
    </Container>
  );
}
