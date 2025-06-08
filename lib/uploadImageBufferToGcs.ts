import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  credentials: {
    client_email: process.env.GCLOUD_CLIENT_EMAIL!,
    private_key: process.env.GCLOUD_PRIVATE_KEY!.replace(/\\n/g, "\n"),
  },
});

/**
 * Uploads image buffer to GCS under `uploads/photo_TIMESTAMP.png`
 */
export async function uploadImageBufferToGCS(
  buffer: Buffer
): Promise<string> {
  const filename = `photo_${Date.now()}.png`;
  const finalPath = `uploads/${filename}`;
  const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET!);
  const file = bucket.file(finalPath);

  await file.save(buffer, {
    contentType: "image/png",
    resumable: false,
    public: true,
    metadata: {
      cacheControl: "public, max-age=31536000",
    },
  });

  return `https://storage.googleapis.com/${bucket.name}/${finalPath}`;
}
