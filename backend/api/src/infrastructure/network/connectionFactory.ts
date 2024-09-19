import { ethers, JsonRpcProvider } from "ethers";
import { Logger } from "winston";
import { Config } from "../../configLoader.js";
import { NetworkConnection } from "./networkConnection.js";
import {PinataSDK} from 'pinata-web3'

export class NetworkConnectionFactory {
  readonly _logger: Logger;
  readonly _config: Config;

  private connection: NetworkConnection | undefined;
  private provider: JsonRpcProvider;
  private pinata: PinataSDK
  constructor(config: Config, logger: Logger) {
    this._logger = logger;
    this._config = config;

    this.connection = undefined;

    if (this._config.NETWORK === "HardHat") {
      this.provider = new ethers.JsonRpcProvider(
        `${this._config.hardHat.url}:${this._config.hardHat.port}`
      );
    } else if (this._config.NETWORK === "Sepolia") {
      this.provider = new ethers.InfuraProvider("sepolia");
    } else {
      throw new Error(
        `${this.constructor.name}: unkown network. Check your environment variables`
      );
    }

    this.pinata = new PinataSDK({
      pinataJwt: this._config.PINATA_JWT,
      pinataGateway: this._config.PINATA_GATEWAY_URL,
    });
  }

  public async getOpenConnection() {
    if (this.connection === undefined) {
      await this.testConnectionAsync();
      this.connection = new NetworkConnection(
        this._config,
        this._logger,
        this.provider,
        this.pinata
      );
    }
    return this.connection;
  }

  private async testConnectionAsync() {
    await this.provider.getNetwork().catch(err => {
      Error.captureStackTrace(err)
      throw err;
    })
  }
}
