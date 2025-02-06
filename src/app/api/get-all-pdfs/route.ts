import { getDrive } from "@/app/utils";
import { redisCache } from "@/services/redis";
import type { drive_v3 } from "googleapis/build/src/apis/drive/v3";
import { NextResponse } from "next/server";
import type { DriveFolder, JournalEntry } from "@/types/journal";

async function getFolderContents(
  drive: drive_v3.Drive,
  folderId: string
): Promise<DriveFolder> {
  const folderDetails = await drive.files.get({
    fileId: folderId,
    fields: "id, name",
  });

  const filesResponse = await drive.files.list({
    q: `'${folderId}' in parents and mimeType='application/pdf'`,
    fields: "files(id, name, webViewLink, createdTime, thumbnailLink)",
    orderBy: "createdTime desc",
  });

  const foldersResponse = await drive.files.list({
    q: `'${folderId}' in parents and mimeType='application/vnd.google-apps.folder'`,
    fields: "files(id, name)",
  });

  const subFolders = await Promise.all(
    (foldersResponse.data.files ?? []).map((folder) =>
      getFolderContents(drive, folder.id!)
    )
  );

  return {
    id: folderDetails.data.id!,
    name: folderDetails.data.name!,
    files: filesResponse.data.files as JournalEntry[],
    subFolders,
  };
}

export async function GET() {
  try {
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    if (!folderId) {
      throw new Error("Google Drive folder ID is not configured");
    }

    // const cachedFiles = await redisCache.get(`pdf:all-files:${folderId}`);
    // if (cachedFiles) {
    //   return NextResponse.json({ files: JSON.parse(cachedFiles) });
    // } else {
    //   // this means that the folder might have changed and thus the previous cached files are no longer valid
    //   await redisCache.cleanUp();
    // }

    const drive = getDrive();
    const folder = await getFolderContents(drive, folderId);

    await redisCache.set(
      `pdf:all-files:${folderId}`,
      JSON.stringify(folder),
      600
    );

    return NextResponse.json({ folder });
  } catch (error) {
    console.error("Error fetching PDFs:", error);
    return NextResponse.json(
      { error: "Failed to fetch PDFs from Google Drive" },
      { status: 500 }
    );
  }
}
