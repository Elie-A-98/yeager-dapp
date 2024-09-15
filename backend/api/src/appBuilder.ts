import { Router } from "express";
import { Config } from "./config.js";
import { loadConfig } from "./configLoader.js";
import { createLogger, Logger } from "./logger.js";
import v1 from "./app/gateways/v1/index.js";

type Services = {
  logger: Logger;
  config: Config;
};

type Gateways = {
  mint: Router;
};

export class AppBuilder {
  readonly services: Services;
  readonly gateways: Gateways;

  constructor() {
    this.services = this.buildServices();
    this.gateways = this.buildGateways();
  }

  private buildGateways(): Gateways {
    return {
      mint: v1(),
    };
  }

  private buildServices() {
    const config = loadConfig();
    const logger = createLogger(config);

    return {
      config,
      logger,
    };
  }
}
