"use client";

import { useState } from "react";
import { JournalEntry } from "@/types/journal";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { PaperList } from "@/components/papers/PaperList";
import { EmptyPaperView } from "@/components/papers/EmptyPaperView";
import PDFViewer from "./PDFViewer";
import { usePapers } from "@/hooks/usePapers";

export default function JournalEntries() {
  const { entries, loading, error } = usePapers();
  const [selectedPaper, setSelectedPaper] = useState<JournalEntry | null>(null);

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      <div className="h-full bg-white shadow-lg rounded-xl overflow-hidden">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <LoadingSpinner size={32} />
          </div>
        ) : (
          <PaperList
            entries={entries}
            selectedPaper={selectedPaper}
            onSelectPaper={setSelectedPaper}
          />
        )}
      </div>
      <div className="h-full bg-white shadow-lg rounded-xl overflow-hidden">
        {selectedPaper ? (
          <PDFViewer
            fileUrl={selectedPaper.pdfData}
            fileName={selectedPaper.name}
          />
        ) : (
          <EmptyPaperView />
        )}
      </div>
    </div>
  );
}
