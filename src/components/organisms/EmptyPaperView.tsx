import { FileText } from "lucide-react";

export function EmptyPaperView() {
  return (
    <div className="flex items-center justify-center w-full min-h-full bg-white">
      <div className="text-center">
        <FileText className="w-12 h-12 mx-auto text-gray-400 mb-2" />
        <p className="text-gray-500">Select a paper to view</p>
      </div>
    </div>
  );
}
