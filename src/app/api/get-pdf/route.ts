import { google } from "googleapis";
import { NextResponse } from "next/server";
import { GaxiosResponse } from "gaxios";

const SCOPES = ["https://www.googleapis.com/auth/drive.readonly"];

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: SCOPES,
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const fileId = searchParams.get('fileId');

    if (!fileId) {
      return NextResponse.json(
        { error: "File ID is required" },
        { status: 400 }
      );
    }

    const drive = google.drive({ version: "v3", auth });
    
    const downloadResponse = (await drive.files.get(
      {
        fileId: fileId,
        alt: "media",
      },
      { responseType: "arraybuffer" }
    )) as GaxiosResponse<ArrayBuffer>;

    const base64Data = Buffer.from(downloadResponse.data).toString("base64");
    const dataUrl = `data:application/pdf;base64,${base64Data}`;

    return NextResponse.json({ url: dataUrl });
  } catch (error) {
    console.error("Error fetching PDF:", error);
    return NextResponse.json(
      { error: "Failed to fetch PDF from Google Drive" },
      { status: 500 }
    );
  }
}