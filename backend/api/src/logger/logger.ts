import winston from "winston";
import { Config } from "../configLoader.js";

let logger: winston.Logger | undefined = undefined;

export const createLogger = (config: Config) => {
  if (logger !== undefined) return logger;
  logger = new winston.Logger({
    format: winston.format.combine(
      winston.format.errors({ stack: true }),
      winston.format.timestamp(),
      winston.format.printf(({ timestamp, level, message, stack }) => {
        return `${timestamp} [${level}]: ${message}\n${stack}`;
      })
    ),
    level: config.logger.level,
    transports: [new winston.transports.Console()],
  });
  return logger;
};

export type Logger = ReturnType<typeof createLogger>;
