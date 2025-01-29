"use client";

import { useState } from "react";
import { JournalEntry } from "@/types/journal";
import { LoadingSpinner } from "@/components/molecules/LoadingSpinner";
import { ErrorMessage } from "@/components/molecules/ErrorMessage";
import { PaperList } from "@/components/organisms/PaperList";
import { EmptyPaperView } from "@/components/organisms/EmptyPaperView";
import PDFViewer from "./PDFViewer";
import { usePapers } from "@/hooks/usePapers";

export default function JournalEntries() {
  const { entries, loading, error } = usePapers();
  const [selectedPaper, setSelectedPaper] = useState<JournalEntry | null>(null);

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-theme(spacing.32))]">
      <div className="flex-1 min-h-full bg-white shadow-lg rounded-xl overflow-hidden">
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
      <div className="flex-1 min-h-full bg-white shadow-lg rounded-xl overflow-hidden">
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
