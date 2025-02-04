import { useState, useEffect } from "react";
import { JournalEntry, GetAllPDFsResponse } from "@/types/journal";

const convertAllPDFResponseToJournalEntries = (
  response: JournalEntry[]
): JournalEntry[] => {
  return response.map((entry) => {
    const nameWithoutFileExtension = entry.name
      .split(".")
      .slice(0, -1)
      .join(".");
    const nameParts = nameWithoutFileExtension.split("-");
    const potentialFileCreateionDate = nameParts.at(-1);
    let createdDate = new Date(entry.createdTime);
    if (potentialFileCreateionDate) {
      const potentialDate = new Date(potentialFileCreateionDate);
      if (
        potentialDate.toString() !== "Invalid Date" &&
        !Number.isNaN(potentialDate.valueOf())
      ) {
        createdDate = potentialDate;
        nameParts.pop();
      }
    }
    const createdYear = createdDate.getFullYear();
    const createdMonth = createdDate.getMonth() + 1;
    return {
      id: entry.id,
      name: nameParts.join("-"),
      webViewLink: entry.webViewLink,
      thumbnailLink: entry.thumbnailLink,
      createdTime: `${createdYear}-${createdMonth}`,
    };
  });
};

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
        const preProcessedFiles = convertAllPDFResponseToJournalEntries(
          data.files
        );
        setEntries(preProcessedFiles);
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
