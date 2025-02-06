export type JournalEntry = {
  id: string;
  name: string;
  webViewLink: string;
  createdTime: string;
  thumbnailLink?: string;
};

export type DriveFolder = {
  id: string;
  name: string;
  files: JournalEntry[];
  subFolders: DriveFolder[];
};

export type GetAllPDFsResponse = {
  folder: DriveFolder;
  error?: string;
};

export type GetPDFResponse = {
  url: string;
};
