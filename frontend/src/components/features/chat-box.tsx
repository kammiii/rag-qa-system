import {
  Accordion,
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/api";
import { toaster } from "../ui/toaster";

interface Message {
  type: "user" | "bot";
  text: string;
  sources?: { page_number: number; chunk: string }[];
}

export function ChatBox() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [showAllSources, setShowAllSources] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const askMutation = useMutation({
    mutationFn: async () => {
      const res = await api.post("/ask", { question: input });
      return res.data;
    },
    onSuccess: (data) => {
      setMessages((prev) => [
        ...prev,
        { type: "user", text: input },
        { type: "bot", text: data.answer, sources: data.sources },
      ]);
      setInput("");
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    },
    onError: () =>
      toaster.create({ title: "Error getting answer", type: "error", duration: 2000 }),
  });

  const highlightMatch = (text: string, question: string) => {
    const escaped = question.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(escaped.split(" ").slice(0, 3).join("|"), "gi");
    return text.replace(pattern, (match) => `<mark>${match}</mark>`);
  };

  return (
    <Flex direction="column" h="500px" w="100%" border="1px solid #444" rounded="md" p={4}>
      <VStack spacing={4} overflowY="auto" flex="1" align="stretch" pr={2}>
        {messages.map((msg, i) => (
          <Box
            key={i}
            alignSelf={msg.type === "user" ? "flex-end" : "flex-start"}
            bg={msg.type === "user" ? "teal.500" : "gray.600"}
            color="white"
            px={4}
            py={2}
            borderRadius="xl"
            maxW="75%"
            whiteSpace="pre-wrap"
          >
            <Text>{msg.text}</Text>

            {/* Bot sources display */}
            {msg.type === "bot" && msg.sources && (
              <>
                <Button
                  mt={2}
                  size="xs"
                  variant="outline"
                  colorScheme="gray"
                  onClick={() => setShowAllSources((s) => !s)}
                >
                  {showAllSources ? "Hide Sources" : "Show Sources"}
                </Button>

                {showAllSources && (
                  <Accordion.Root mt={2}>
                    {msg.sources.map((s, idx) => (
                      <Accordion.Item key={idx} value={s.chunk}>
                        <Accordion.ItemTrigger>
                          <Box flex="1" textAlign="left" fontSize="sm">
                            📄 Page {s.page_number}
                          </Box>
                        </Accordion.ItemTrigger>
                        <Accordion.ItemContent pb={4}>
                          <Text
                            dangerouslySetInnerHTML={{
                              __html: highlightMatch(s.chunk, msg.text),
                            }}
                          />
                        </Accordion.ItemContent>
                      </Accordion.Item>
                    ))}
                  </Accordion.Root>
                )}
              </>
            )}
          </Box>
        ))}
        <div ref={bottomRef} />
      </VStack>

      <HStack mt={4}>
        <Input
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && askMutation.mutate()}
        />
        <Button
          onClick={() => askMutation.mutate()}
          colorScheme="teal"
          loading={askMutation.isPending}
        >
          Ask
        </Button>
      </HStack>
    </Flex>
  );
}
