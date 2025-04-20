import { FileUploader } from "@/lib/gcp/gcp";
import { DOWNLOAD_EXPIRY_IN_SECONDS } from "@/lib/gcp/gcp-utils";
import { db } from "@/lib/db";

function getSignedUrlExpiryDate(signedUrl) {
  const url = new URL(signedUrl);
  const expirationTimestamp = Number(url.searchParams.get("X-Goog-Expires")); // Convert to number
  const expirationDate: Date = new Date();
  expirationDate.setTime(expirationDate.getTime() + expirationTimestamp * 1000);
  const currentDate: Date = new Date();
  const daysRemaining = Math.ceil(
    (expirationDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24),
  );
  return daysRemaining;
}

export async function getLatestFileMetaData(assetId: string) {
  const metaData = await db.gCPData.findFirst({
    where: {
      assetId: assetId,
    },
  });
  console.log("MetaData", metaData);
  return metaData;
}
