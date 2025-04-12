const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { exec } = require("child_process");
const util = require("util");

const execAsync = util.promisify(exec);

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

async function runPrismaCommands() {
  try {
    console.log("Running Prisma commands...");
    await execAsync("npx prisma generate");
    console.log("Prisma generate completed.");
    await execAsync("npx prisma migrate deploy");
    console.log("Prisma migrate deploy completed.");
  } catch (error) {
    console.error("Error running Prisma commands:", error);
    process.exit(1); // Exit the process if Prisma commands fail
  }
}

app.prepare().then(async () => {
  await runPrismaCommands(); // Run Prisma commands before starting the server

  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      if (pathname === "/a") {
        await app.render(req, res, "/a", query);
      } else if (pathname === "/b") {
        await app.render(req, res, "/b", query);
      } else {
        await handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});