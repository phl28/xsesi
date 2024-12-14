"use client";

import { useState, useEffect } from "react";
import { FileText, Calendar, ExternalLink } from "lucide-react";
import PDFViewer from "./PDFViewer";

interface JournalEntry {
  id: string;
  name: string;
  webViewLink: string;
  createdTime: string;
}

export default function JournalEntries() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPaper, setSelectedPaper] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEntries() {
      try {
        const response = await fetch("/api/fetch-pdfs");
        const data = await response.json();
        setEntries(data.files);
      } catch (error) {
        console.error("Error fetching entries:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEntries();
  }, []);

  if (loading) {
    return <div className="text-center">Loading journal entries...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {entries.map((entry) => (
            <li key={entry.id}>
              <button
                onClick={() => setSelectedPaper(entry.webViewLink)}
                className="w-full text-left block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
              >
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      <FileText className="inline-block mr-2" size={16} />
                      {entry.name}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <ExternalLink className="text-gray-400" size={16} />
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        {new Date(entry.createdTime).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white shadow sm:rounded-md">
        {selectedPaper ? (
          <PDFViewer fileUrl={selectedPaper} />
        ) : (
          <div className="p-4 text-center text-gray-500">
            Select a paper to view
          </div>
        )}
      </div>
    </div>
  );
}
