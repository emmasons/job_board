const exec = require("child_process").exec;
const path = require("path");

// Get environment variables
const host = process.env.MYSQL_HOST;
const database = process.env.MYSQL_DATABASE;
const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const port = process.env.MYSQL_PORT || 3306;

// Check for required environment variables
if (!host || !database || !user || !password) {
  console.error("Missing required environment variables");
  process.exit(1);
}

// Get backup file path from command line argument
const backupFile = process.argv[2];
if (!backupFile) {
  console.error("Please provide the backup file path");
  console.error(
    "Usage: node db_restore.js ./db_backups/2025-05-06T16-46-37_backup.sql"
  );
  process.exit(1);
}

try {
  console.log("Starting database restoration...");
  const command = `mysql -h ${host} -P ${port} -u ${user} -p${password} ${database} < ${backupFile}`;

  exec(command, { env: process.env }, (err, stdout, stderr) => {
    if (err) {
      console.error("Restoration failed:", err);
      return;
    }
    if (stderr && !stderr.includes("Warning")) {
      console.error("Restoration encountered issues:", stderr);
      return;
    }
    console.log("Database restored successfully!");
  });
} catch (error) {
  console.error("Restoration failed:", error);
  process.exit(1);
}
