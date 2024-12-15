import { useState, useEffect } from "react";
import { JournalEntry, APIResponse } from "@/types/journal";
import { mockPapers } from "@/fixtures/mockPapers";

const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

export function usePapers() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEntries() {
      try {
        if (USE_MOCK_DATA) {
          // Simulate API delay with mock data
          await new Promise((resolve) => setTimeout(resolve, 1000));
          setEntries(mockPapers);
          return;
        }

        const response = await fetch("/api/fetch-pdfs");
        if (!response.ok) {
          throw new Error("Failed to fetch papers");
        }
        const data: APIResponse = await response.json();
        setEntries(data.files);
      } catch (error) {
        console.error("Error fetching entries:", error);
        setError("Failed to load papers. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchEntries();
  }, []);

  return { entries, loading, error };
}
