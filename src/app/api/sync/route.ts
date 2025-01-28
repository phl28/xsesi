import { NextResponse } from "next/server";
import { GET as fetchPDFs } from "../fetch-pdfs/route";

export async function GET() {
  try {
    await fetchPDFs();
    return NextResponse.json({
      message: "Synchronization completed successfully",
    });
  } catch (error) {
    console.error("Error during synchronization:", error);
    return NextResponse.json(
      { error: "Synchronization failed" },
      { status: 500 }
    );
  }
}

export const config = {
  runtime: "edge",
};
