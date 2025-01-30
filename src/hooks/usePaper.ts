import { GetPDFResponse } from "@/types/journal";
import { useState, useEffect } from "react";

export function usePaper({ fileId }: { fileId: string }) {
  const [fileUrl, setFileUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPDF() {
      try {
        const response = await fetch(`/api/get-pdf?fileId=${fileId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch file");
        }
        const data: GetPDFResponse = await response.json();
        setFileUrl(data.url);
      } catch (error) {
        console.error("Error fetching file:", error);
        setError("Failed to load file. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchPDF();
  }, [fileId]);

  return { fileUrl, loading, error };
}
