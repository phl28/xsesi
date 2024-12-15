import { JournalEntry } from "@/types/journal";
import { PaperListItem } from "./PaperListItem";

interface PaperListProps {
  entries: JournalEntry[];
  selectedPaper: JournalEntry | null;
  onSelectPaper: (entry: JournalEntry) => void;
}

export function PaperList({
  entries,
  selectedPaper,
  onSelectPaper,
}: PaperListProps) {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden">
      <div className="p-4 bg-indigo-50 border-b border-indigo-100">
        <h2 className="text-lg font-semibold text-indigo-900">
          Available Papers
        </h2>
      </div>
      <ul className="divide-y divide-gray-100">
        {entries.map((entry) => (
          <PaperListItem
            key={entry.id}
            entry={entry}
            isSelected={selectedPaper?.id === entry.id}
            onSelect={onSelectPaper}
          />
        ))}
      </ul>
    </div>
  );
}
