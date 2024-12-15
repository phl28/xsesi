import { JournalEntry } from "../types/journal";

// Sample base64 encoded tiny PDF (1x1 pixel) - for testing purposes
const MOCK_PDF_DATA =
  "data:application/pdf;base64,JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwogIC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAvTWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0KPj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAgL1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9udAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2JqCgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAwMDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G";

export const mockPapers: JournalEntry[] = [
  {
    id: "1",
    name: "Machine Learning in Healthcare.pdf",
    webViewLink: "https://example.com/view/1",
    createdTime: "2024-01-15T10:30:00Z",
    pdfData: MOCK_PDF_DATA,
    thumbnailLink: "https://example.com/thumbnail/1",
  },
  {
    id: "2",
    name: "Quantum Computing Applications.pdf",
    webViewLink: "https://example.com/view/2",
    createdTime: "2024-01-20T14:45:00Z",
    pdfData: MOCK_PDF_DATA,
    thumbnailLink: "https://example.com/thumbnail/2",
  },
  {
    id: "3",
    name: "Artificial Intelligence Ethics.pdf",
    webViewLink: "https://example.com/view/3",
    createdTime: "2024-02-01T09:15:00Z",
    pdfData: MOCK_PDF_DATA,
    thumbnailLink: "https://example.com/thumbnail/3",
  },
];
