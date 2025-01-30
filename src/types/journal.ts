export type JournalEntry = {
  id: string;
  name: string;
  webViewLink: string;
  createdTime: string;
  thumbnailLink?: string;
};

export type GetAllPDFsResponse = {
  files: JournalEntry[];
  error?: string;
};

export type GetPDFResponse = {
  url: string;
};
