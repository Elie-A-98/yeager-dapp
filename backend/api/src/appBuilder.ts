import { Router } from "express";
import { Config } from "./configLoader.js";
import { MintTokenCommandHandler } from "@yeager/application/use-cases/mint-token/mintToken.js";
import gateways from "./app/gateways/index.js";
import { NetworkConnectionFactory } from "./infrastructure/network/connectionFactory.js";
import { createLogger, Logger } from "./logger/logger.js";
import { INetworkRepository } from "@yeager/domain/minting/INetworkRepository.js";
import { NetworkRepository } from "./infrastructure/network/networkRepository.js";

type Services = {
  logger: Logger;
  config: Config;
  networkConnectionFactory: NetworkConnectionFactory;
  networkRepository: INetworkRepository
};

export type UseCases = {
  mintToken: MintTokenCommandHandler;
};

export class AppBuilder {
  private readonly _config: Config;
  readonly services: Services;
  readonly gateways: Router;
  readonly useCases: UseCases;

  constructor(config: Config) {
    this._config = config;
    this.services = this.buildServices();
    this.useCases = this.buildUseCases();
    this.gateways = this.buildGateways();
  }

  public async connectToNetwork() {
    const connectionFactory = this.services.networkConnectionFactory;
    await connectionFactory.getOpenConnection();
  }

  private buildGateways() {
    return gateways(this.useCases);
  }

  private buildServices() {
    const logger = createLogger(this._config);
    const networkConnectionFactory = new NetworkConnectionFactory(
      this._config,
      logger
    );
    const networkRepository = new NetworkRepository(networkConnectionFactory)

    return {
      config: this._config,
      logger,
      networkConnectionFactory,
      networkRepository
    };
  }

  private buildUseCases(): UseCases {
    return {
      mintToken: new MintTokenCommandHandler(this.services.networkRepository),
    };
  }
}
