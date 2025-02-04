import { Calendar, ExternalLink, FileText } from "lucide-react";
import { JournalEntry } from "@/types/journal";

interface PaperListItemProps {
  entry: JournalEntry;
  isSelected: boolean;
  onSelect: (entry: JournalEntry) => void;
}

export function PaperListItem({
  entry,
  isSelected,
  onSelect,
}: PaperListItemProps) {
  return (
    <li>
      <button
        onClick={() => onSelect(entry)}
        className={`w-full text-left block hover:bg-indigo-50 focus:outline-none focus:bg-indigo-50
          transition duration-150 ease-in-out p-4 ${
            isSelected ? "bg-indigo-50" : ""
          }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="text-indigo-600" size={20} />
            <div>
              <p className="text-sm font-medium text-gray-900">{entry.name}</p>
              <p className="text-xs text-gray-500 flex items-center mt-1">
                <Calendar className="w-3 h-3 mr-1" />
                {entry.createdTime}
              </p>
            </div>
          </div>
          <ExternalLink
            className="text-gray-400 hover:text-indigo-600"
            size={16}
          />
        </div>
      </button>
    </li>
  );
}
