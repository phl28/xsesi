import { useState, useEffect } from "react";
import { GetAllPDFsResponse, DriveFolder, JournalEntry } from "@/types/journal";

const cleanDateAndFileName = (entry: JournalEntry) => {
  const nameWithoutFileExtension = entry.name.split(".").slice(0, -1).join(".");
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
    displayName: nameParts.join("-"),
    createdTime: `${createdYear}-${createdMonth}`,
  };
};

const convertAllPDFResponseToFolderStruture = (
  response: GetAllPDFsResponse["folder"]
): DriveFolder => {
  const fileResponse = response.files ?? [];
  const files = fileResponse.map((entry) => {
    const { displayName, createdTime } = cleanDateAndFileName(entry);
    return {
      ...entry,
      name: displayName,
      createdTime,
    };
  });
  const subFolderResponse = response.subFolders ?? [];
  const subFolders = subFolderResponse.map((folder) =>
    convertAllPDFResponseToFolderStruture(folder)
  );
  return {
    id: response.id,
    name: response.name,
    files,
    subFolders,
  };
};

export function usePapers() {
  const [entries, setEntries] = useState<DriveFolder>();
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
        const postProcessedFolder = convertAllPDFResponseToFolderStruture(
          data.folder
        );
        setEntries(postProcessedFolder);
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
