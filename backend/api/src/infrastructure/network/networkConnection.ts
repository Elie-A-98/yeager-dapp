import { ethers, JsonRpcProvider } from "ethers";
import { Config } from "../../configLoader.js";
import { Wallet } from "ethers";
import * as token from '@yeager/nft/token.json' with {type: "json"}
import { Logger } from "../../logger/logger.js";
import { AddressId } from "@yeager/domain/minting/INetworkRepository.js";
import { PinataSDK } from "pinata-web3";

type TokenContract = {
  safeMint: (address: AddressId, uri: string) => Promise<void>
}

export class NetworkConnection {
  private readonly _config: Config;
  private readonly _logger: Logger;
  private readonly _provider: JsonRpcProvider;
  private readonly _pinata: PinataSDK;

  readonly wallet: Wallet
  readonly signer: Wallet;
  readonly contract: TokenContract
  get pinata(){
    return this._pinata
  }
  constructor(config: Config, logger: Logger, provider: JsonRpcProvider, pinata: PinataSDK) {
    this._logger = logger
    this._config = config;
    this._provider = provider

    this.wallet = new Wallet(this._config.WALLET_PRIVATE_KEY)
    this.signer = this.wallet.connect(provider);
    //@ts-expect-error there are no generated types so i have to provide custom types
    this.contract = new ethers.Contract(token.default.contract.target, token.default.abi, this.signer) as TokenContract;
    this._pinata = pinata
  }
}
