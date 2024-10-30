const exec = require("child_process").exec;
const fs = require("fs");
const { dirname } = require("path");
const cron = require("node-cron");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { Storage } = require("@google-cloud/storage");
const path = require("path");
const gsBucketName = process.env.GS_BUCKET_NAME;
const gsLocation = process.env.GS_LOCATION;
// Initialize storage
const gcpStorage = new Storage({ keyFilename: process.env.GS_CREDENTIALS });
const bucket = gcpStorage.bucket(gsBucketName);

const {
  POSTGRES_HOST: host,
  POSTGRES_DB: database,
  POSTGRES_USER: user,
  POSTGRES_PASSWORD: password,
} = process.env;

if (!host || !database || !user || !password) {
  console.error("Missing required environment variables");
  process.exit(1);
}

cron.schedule("*/5 * * * *", () => {
  console.log("Backup cron job executed at:", new Date().toLocaleString());
  try {
    fs.mkdirSync("./db_backups");
  } catch (err) {
    if (err.code !== "EEXIST") throw err;
  }

  const formattedDate = new Date()
    .toISOString()
    .replace(/:/g, "-")
    .replace(/\..+/, "");
  const backupFile = `./db_backups/${formattedDate}_backup.sql`;
  const formattedName = backupFile.slice(2);

  try {
    const command = `PGPASSWORD=${password} pg_dump -h ${host} -d ${database} --port 5432 -U ${user} -F c -f ${backupFile}`;

    const appRoot = path.resolve(__dirname, "../../");
    exec(command, { env: process.env }, (err, stdout, stderr) => {
      if (err) {
        console.error(`Backup failed: ${err.message}`);
      } else {
        console.log(`Backup saved as ${backupFile}`);
        bucket.upload(
          `${appRoot}/${formattedName}`,
          {
            destination: `jobs_connect_db_backups/${formattedName}`,
          },
          function (err, file) {
            if (err) {
              console.error(`❌ Error uploading backup: ${err}`);
            } else {
              console.log(`Backup successfully uploaded to ${gsBucketName}.`);
              // delete local file ********************
            }
          },
        );
      }
    });
  } catch (error) {
    console.log(error);
    console.log("❌ BACKUP FAILED");
  }
});
