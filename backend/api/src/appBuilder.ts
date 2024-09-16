import { Router } from "express";
import { Config, loadConfig } from "./configLoader.js";
import { createLogger, Logger } from "./logger.js";
import v1 from "./app/gateways/v1/index.js";
import {MintTokenCommandHandler} from 'application/mintToken.js'
import { IMinter } from "yeager-domain";
import { Minter } from "./mint/minter.js";

type Services = {
  logger: Logger;
  config: Config;
  minter: IMinter;
};

type Gateways = {
  mint: Router;
};

export type UseCases = {
  mintToken: MintTokenCommandHandler
}

export class AppBuilder {
  readonly services: Services;
  readonly gateways: Gateways;
  readonly useCases: UseCases;

  constructor() {
    this.services = this.buildServices();
    this.useCases = this.buildUseCases();
    this.gateways = this.buildGateways();
  }

  private buildGateways(): Gateways {
    return {
      mint: v1(this.useCases),
    };
  }

  private buildServices() {
    const config = loadConfig();
    const logger = createLogger(config);
    const minter = new Minter(config)

    return {
      config,
      logger,
      minter
    };
  }

  private buildUseCases(): UseCases{
    return {
      mintToken: new MintTokenCommandHandler(this.services.minter)
    }
  }
}
