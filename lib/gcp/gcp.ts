const { Storage } = require("@google-cloud/storage");
const { env } = require("../env");

export class FileUploader {
  gsBucketName: string;
  gsLocation: string;
  blobName: any;
  contentType: string;
  method: string;
  fileName: string;
  storage: any;
  downloadExpiryDate: Date;
  isPublic: boolean;
  constructor(
    blobName: string,
    contentType: string,
    method: string,
    downloadExpiryDate: Date,
    isPublic: boolean = false,
  ) {
    this.isPublic = isPublic;
    this.blobName = blobName;
    this.contentType = contentType;
    this.method = method;
    //   The ID of your GCS bucket
    this.gsBucketName = this.isPublic
      ? env.GS_PUBLIC_BUCKET_NAME
      : env.GS_BUCKET_NAME;
    this.gsLocation = env.GS_LOCATION;
    this.fileName = `${this.gsLocation}/${this.blobName}`;
    this.downloadExpiryDate = downloadExpiryDate;

    this.storage = new Storage({ keyFilename: env.GS_CREDENTIALS });
  }

  async makeFilePublic(): Promise<string> {
    const bucket = this.storage.bucket(this.gsBucketName);
    const file = bucket.file(this.fileName);

    // Make the file public
    await file.makePublic();
    const publicUrl = file.publicUrl();
    return publicUrl;
  }

  generateSignedUrl(): Promise<{ url: string; blobName: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        const options = {
          version: "v4",
          action: "write",
          expires: Date.now() + 30 * 60 * 1000, // 30 minutes
          contentType: this.contentType,
          method: this.method,
          headers: {
            "content-type": this.contentType, // Include the content-type header in the signedheaders
          },
        };

        // Get a v4 signed URL for uploading file
        const [url] = await this.storage
          .bucket(this.gsBucketName)
          .file(this.fileName)
          .getSignedUrl(options);

        resolve({ url, blobName: this.fileName });
      } catch (error) {
        reject(error);
      }
    });
  }

  generateSignedDownloadUrl(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      if (this.isPublic) {
        return resolve(await this.makeFilePublic());
      } else {
        try {
          const options = {
            version: "v4",
            action: "read",
            expires: this.downloadExpiryDate,
          };

          const [url] = await this.storage
            .bucket(this.gsBucketName)
            .file(this.fileName)
            .getSignedUrl(options);

          resolve(url);
        } catch (error) {
          reject(error);
        }
      }
    });
  }

  async uploadFile(file: FormDataEntryValue): Promise<{
    status: number;
    message: string;
    downloadUrl: string;
    blobName: string;
  }> {
    return new Promise(async (resolve, reject) => {
      // console.log(await this.generateSignedDownloadUrl())
      try {
        const { url } = await this.generateSignedUrl();
        const cloudResponse = await fetch(url, {
          method: this.method,
          headers: {
            "Content-Type": this.contentType,
          },
          body: file,
        });
        console.log(cloudResponse.status, cloudResponse.statusText);
        const downloadUrl = await this.generateSignedDownloadUrl();
        const response = {
          status: cloudResponse.status,
          message: cloudResponse.statusText,
          downloadUrl: downloadUrl,
          blobName: this.fileName,
        };
        resolve(response);
      } catch (error) {
        resolve({
          status: 500,
          message: error.message || error,
          downloadUrl: "",
          blobName: this.fileName,
        });
      }
    });
  }

  async uploadFileBuffer(
    fileBuffer: Buffer,
  ): Promise<{ status: number; message: string; downloadUrl: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        const writer = this.storage
          .bucket(this.gsBucketName)
          .file(this.fileName)
          .createWriteStream({
            metadata: {
              contentType: this.contentType,
            },
          });

        writer.end(fileBuffer); // Write the file buffer to the GCS stream

        writer.on("finish", async () => {
          const downloadUrl = await this.generateSignedDownloadUrl();
          resolve({
            status: 200, // Assuming success code on upload completion
            message: "File uploaded successfully",
            downloadUrl,
          });
        });

        writer.on("error", (error) => {
          reject({
            status: 500,
            message: error.message || error,
            downloadUrl: "",
          });
        });
      } catch (error) {
        reject({
          status: 500,
          message: error.message || error,
          downloadUrl: "",
        });
      }
    });
  }

  async getGenerationNumber() {
    const [metadata] = await this.storage
      .bucket(this.gsBucketName)
      .file(this.fileName)
      .getMetadata();
    const generationNumber = metadata.generation;
    return generationNumber;
  }

  async deleteBlob() {
    const generationMatchPrecondition = await this.getGenerationNumber();
    const deleteOptions = {
      ifGenerationMatch: generationMatchPrecondition || 0,
    };

    const [response] = await this.storage
      .bucket(this.gsBucketName)
      .file(this.fileName)
      .delete(deleteOptions);
  }
}
