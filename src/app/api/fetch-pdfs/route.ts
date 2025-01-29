import { google } from "googleapis";
import { NextResponse } from "next/server";
import { GaxiosResponse } from "gaxios";

const SCOPES = ["https://www.googleapis.com/auth/drive.readonly"];

// Create a more robust auth configuration
const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: SCOPES,
});

export async function GET() {
  try {
    const drive = google.drive({ version: "v3", auth });
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

    if (!folderId) {
      throw new Error("Google Drive folder ID is not configured");
    }

    const response = await drive.files.list({
      q: `'${folderId}' in parents and mimeType='application/pdf'`,
      fields: "files(id, name, webViewLink, createdTime, thumbnailLink)",
      orderBy: "createdTime desc",
      pageSize: 100,
    });

    const files = response.data.files;

    if (!files || files.length === 0) {
      return NextResponse.json({ files: [] });
    }

    // Get direct download links for each PDF
    // This part takes a long time
    // @TODO: move this to a separate route and only get the download response when file is clicked
    const filesWithDownloadLinks = await Promise.all(
      files.map(async (file) => {
        if (!file.id) return;
        const downloadResponse = (await drive.files.get(
          {
            fileId: file.id,
            alt: "media",
          },
          { responseType: "arraybuffer" }
        )) as GaxiosResponse<ArrayBuffer>; // Type assertion for the response

        const base64Data = Buffer.from(downloadResponse.data).toString(
          "base64"
        );
        const dataUrl = `data:application/pdf;base64,${base64Data}`;
        return {
          ...file,
          pdfData: dataUrl,
        };
      })
    );

    return NextResponse.json({ files: filesWithDownloadLinks.filter(Boolean) }); // Filter out undefined values
  } catch (error) {
    console.error("Error fetching PDFs:", error);
    return NextResponse.json(
      { error: "Failed to fetch PDFs from Google Drive" },
      { status: 500 }
    );
  }
}
