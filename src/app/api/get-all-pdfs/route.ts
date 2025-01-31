import { getDrive, redisCache } from "@/app/utils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    if (!folderId) {
      throw new Error("Google Drive folder ID is not configured");
    }

    const cachedFiles = await redisCache.get(`pdf:all-files:${folderId}`);
    if (cachedFiles) {
      return NextResponse.json({ files: JSON.parse(cachedFiles) });
    }

    const drive = getDrive();
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

    await redisCache.set(
      `pdf:all-files:${folderId}`,
      JSON.stringify(files),
      600
    );

    return NextResponse.json({ files });
  } catch (error) {
    console.error("Error fetching PDFs:", error);
    return NextResponse.json(
      { error: "Failed to fetch PDFs from Google Drive" },
      { status: 500 }
    );
  }
}
