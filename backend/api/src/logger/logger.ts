import winston from "winston";
import { Config } from "../configLoader.js";

let logger: winston.Logger | undefined = undefined;

export const createLogger = (config: Config) => {
  if (logger !== undefined) return logger;
  logger = new winston.Logger({
    level: config.logger.level,
    transports: [new winston.transports.Console()],
  });
  return logger;
};

export type Logger = ReturnType<typeof createLogger>;
