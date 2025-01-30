import { NextResponse } from "next/server";
import { GaxiosResponse } from "gaxios";
import { getDrive, redisCache } from "@/app/utils";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const fileId = searchParams.get("fileId");

    if (!fileId) {
      return NextResponse.json(
        { error: "File ID is required" },
        { status: 400 }
      );
    }

    const cachedData = await redisCache.get(`pdf:${fileId}`);
    if (cachedData) {
      return NextResponse.json({ url: cachedData });
    }

    const drive = getDrive();
    const downloadResponse = (await drive.files.get(
      {
        fileId: fileId,
        alt: "media",
      },
      { responseType: "arraybuffer" }
    )) as GaxiosResponse<ArrayBuffer>;

    const base64Data = Buffer.from(downloadResponse.data).toString("base64");
    const dataUrl = `data:application/pdf;base64,${base64Data}`;

    await redisCache.set(`pdf:${fileId}`, dataUrl);

    return NextResponse.json({ url: dataUrl });
  } catch (error) {
    console.error("Error fetching PDF:", error);
    return NextResponse.json(
      { error: "Failed to fetch PDF from Google Drive" },
      { status: 500 }
    );
  }
}
