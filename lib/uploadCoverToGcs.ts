import { Storage } from "@google-cloud/storage";
import path from "path";

// Setup GCS client
const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  credentials: {
    client_email: process.env.GCLOUD_CLIENT_EMAIL!,
    private_key: process.env.GCLOUD_PRIVATE_KEY!.replace(/\\n/g, "\n"),
  },
});

/**
 * Sanitize name by replacing spaces and lowercasing, fallback to UUID.
 */
function generateFilename(
  originalFilename: string,
  name?: string
): string {
  const extension = path.extname(originalFilename) || ".pdf";
  const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(8, 12); // e.g., '0638'

  let baseName = "Generated_CV";

  if (name) {
    const sanitized = name
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9_]/g, "")
      .trim();

    if (sanitized.length > 0) {
      baseName = `${sanitized}_Cover`;
    }
  }

  return `generated/${baseName}_${timestamp}${extension}`;
}

export async function uploadBufferToGCS(
  buffer: Buffer,
  originalFilename: string,
  mimetype: string,
  name?: string // name from the form
): Promise<string> {
  const finalName = generateFilename(originalFilename, name);
  const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET!);
  const file = bucket.file(finalName);

  await file.save(buffer, {
    contentType: mimetype,
    resumable: false,
    public: true,
  });

  return `https://storage.googleapis.com/${bucket.name}/${finalName}`;
}
