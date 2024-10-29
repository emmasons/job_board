// logs.js
import winston from "winston";
const logLevel = process.env.NODE_ENV === "production" ? "info" : "debug";
const logger = winston.createLogger({
  level: logLevel,
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      level: logLevel,
      colorize: true,
      timestamp: function () {
        return new Date().toLocaleTimeString();
      },
      prettyPrint: true,
    }),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

winston.addColors({
  error: "red",
  warn: "yellow",
  info: "green",
  debug: "blue",
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

export const logError = (
  error: Error,
  route = "",
  causeOfError: string,
  timestamp: string,
): void => {
  logger.error(
    `${error.message} ${
      error.stack ? `\n${error.stack}` : ""
    } on route: ${route}, cause: ${causeOfError}, timestamp: ${timestamp}`,
  );
};

export default logError;
