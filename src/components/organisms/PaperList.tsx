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
    <div className="flex flex-col h-full">
      <div className="flex-none p-4 bg-header-gradient border-b border-indigo-100">
        <h2 className="text-lg font-semibold text-indigo-900">
          Available Papers
        </h2>
      </div>
      <div className="flex-1 overflow-auto">
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
    </div>
  );
}
