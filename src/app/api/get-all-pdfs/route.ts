import { google } from "googleapis";
import { NextResponse } from "next/server";

const SCOPES = ["https://www.googleapis.com/auth/drive.readonly"];

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: SCOPES,
});

export async function GET() {
  try {
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

    if (!folderId) {
      throw new Error("Google Drive folder ID is not configured");
    }

    const drive = google.drive({ version: "v3", auth });

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

    return NextResponse.json({ files: files });
  } catch (error) {
    console.error("Error fetching PDFs:", error);
    return NextResponse.json(
      { error: "Failed to fetch PDFs from Google Drive" },
      { status: 500 }
    );
  }
}
