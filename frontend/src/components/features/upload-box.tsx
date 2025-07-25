import { Button, Input, VStack } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api";
import { toaster } from "../ui/toaster";

export function UploadBox() {
  const qc = useQueryClient();
  const [file, setFile] = useState<File | null>(null);

  const uploadMutation = useMutation({
    mutationFn: async () => {
      if (!file) return;
      const formData = new FormData();
      formData.append("file", file);
      await api.post("/upload", formData);
    },
    onSuccess: () => {
      toaster.create({ title: "Uploaded successfully", type: "success" });
      qc.invalidateQueries({ queryKey: ["docUploaded"] });
    },
    onError: () => toaster.create({ title: "Upload failed", type: "error" }),
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };

  return (
    <VStack spaceX={4} spaceY={4}>
      <Input type="file" onChange={handleFileChange} />
      <Button
        onClick={() => uploadMutation.mutate()}
        disabled={!file}
        colorScheme="teal"
        loading={uploadMutation.isPending}
      >
        Upload PDF
      </Button>
    </VStack>
  );
}
