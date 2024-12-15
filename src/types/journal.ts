export interface JournalEntry {
  id: string;
  name: string;
  webViewLink: string;
  createdTime: string;
  pdfData: string;
  thumbnailLink?: string;
}

export interface APIResponse {
  files: JournalEntry[];
  error?: string;
}
