import { Router } from "express";
import { Config, loadConfig } from "./configLoader.js";
import { createLogger, Logger } from "./logger.js";
import {MintTokenCommandHandler} from 'application/mintToken.js'
import { IMinter } from "yeager-domain";
import { Minter } from "./infrastructure/minting/minter.js";
import gateways from "./app/gateways/index.js";

type Services = {
  logger: Logger;
  config: Config;
  minter: IMinter;
};

export type UseCases = {
  mintToken: MintTokenCommandHandler
}

export class AppBuilder {
  readonly services: Services;
  readonly gateways: Router;
  readonly useCases: UseCases;

  constructor() {
    this.services = this.buildServices();
    this.useCases = this.buildUseCases();
    this.gateways = this.buildGateways();
  }

  private buildGateways(){
    return gateways(this.useCases);
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
