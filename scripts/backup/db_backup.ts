const exec = require("child_process").exec;
const fs = require("fs");
const path = require("path"); // Add this line
const { dirname } = require("path");
const cron = require("node-cron");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Correct way to destructure environment variables
const host = process.env.MYSQL_HOST;
const database = process.env.MYSQL_DATABASE;
const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const port = process.env.MYSQL_PORT || 3306;

if (!host || !database || !user || !password) {
  console.error("Missing required environment variables");
  process.exit(1);
}

// cron.schedule("0 0 * * *", () => {
console.log("Backup cron job executed at:", new Date().toLocaleString());

const formattedDate = new Date()
  .toISOString()
  .replace(/:/g, "-")
  .replace(/\..+/, "");
const backupFile = `./db_backups/${formattedDate}_backup.sql`;
const formattedName = backupFile.slice(2);

try {
  console.log(`Running backup command...`);
  // MySQL backup command using mysqldump
  const command = `mysqldump -h ${host} -P ${port} -u ${user} -p${password} ${database} > ${backupFile}`;

  const appRoot = path.resolve(__dirname, "../../");

  // Ensure backup directory exists
  const backupDir = path.dirname(backupFile);
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  exec(command, { env: process.env }, (err, stdout, stderr) => {
    if (stderr && !stderr.includes("Warning")) {
      // Ignore MySQL warnings
      console.error(`Backup failed: ${stderr}`);
      return;
    }
    if (err) {
      console.error(`Backup failed: ${err.message}`);
      return;
    }

    console.log(`Backup successfully saved as ${backupFile}`);
  });
} catch (error) {
  console.log(error);
  console.log("❌ BACKUP FAILED");
}
// });
