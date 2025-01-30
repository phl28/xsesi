import { useState, useEffect } from "react";
import { JournalEntry, GetAllPDFsResponse } from "@/types/journal";

export function usePapers() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEntries() {
      try {
        const response = await fetch("/api/get-all-pdfs");
        if (!response.ok) {
          throw new Error("Failed to fetch papers");
        }
        const data: GetAllPDFsResponse = await response.json();
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
