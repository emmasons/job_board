const fs = require("fs");
import { NextRequest, NextResponse } from "next/server";
import { getCurrentSessionUser } from "@/lib/auth";
import { uploadFile } from "@/lib/gcp/gcp-utils";
import logError from "@/lib/logging";

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentSessionUser();

    if (!user || user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const logsLocation =
      process.env.NODE_ENV === "production" ? `/app/logs` : `logs`;

    const files = await fs.promises.readdir(logsLocation);

    if (files.length > 0) {
      let uploadStatus = true;

      const promise = Promise.all(
        files.map(async (file) => {
          const filePath = `${process.cwd()}/logs/${file}`;
          console.log(filePath);
          const fileBuffer = await fs.promises.readFile(filePath);
          const fileKey = `logs/${file}`;
          const cloudResponse = await uploadFile(
            fileBuffer,
            fileKey,
            "application log (text/x-log)",
            true,
          );

          if (cloudResponse.status !== 200) {
            logError(
              new Error(`Error uploading logs: ${cloudResponse.message}`),
              "/api/logs",
              "Error uploading logs",
              new Date().toISOString(),
            );
            uploadStatus = false;
          } else {
            uploadStatus = true;
          }
        }),
      );
      await promise;
      if (uploadStatus) {
        return NextResponse.json(
          { message: "OK", status: 200 },
          { status: 200 },
        );
      } else {
        return NextResponse.json(
          { message: "Error uploading logs", status: 500 },
          { status: 500 },
        );
      }
    } else {
      logError(
        new Error("No files found"),
        "/api/logs",
        "No files found",
        new Date().toISOString(),
      );
      return NextResponse.json(
        { message: "No files found", status: 404 },
        { status: 404 },
      );
    }
  } catch (error) {
    console.log("[LOGS]", error);
    logError(
      error,
      "/api/logs",
      "Error uploading logs",
      new Date().toISOString(),
    );
    return NextResponse.json(
      { message: "Internal Error", status: 500 },
      { status: 500 },
    );
  }
}
