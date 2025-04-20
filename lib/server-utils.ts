// Create a file like lib/server-utils.js (mark it as server-only)
"use server";

import path from "path";
import { mkdir, access } from "fs/promises";

export async function getLocalUploadDirectory() {
  const uploadsDir = path.join(process.cwd(), "public/uploads");

  try {
    await access(uploadsDir);
  } catch (error) {
    // Directory doesn't exist, create it
    await mkdir(uploadsDir, { recursive: true });
  }

  return uploadsDir;
}
