import { IMinter } from "yeager-domain";
import { ethers } from "ethers";
import { JsonRpcProvider } from "ethers";
import { Config } from "../configLoader.js";
import { Wallet } from "ethers";
import * as token from 'nft/token.json' with {type: "json"}

export class Minter implements IMinter {
  readonly _config: Config;

  constructor(config: Config) {
    this._config = config;
  }
  async canMint(): Promise<boolean> {
    // for now i will return true. This can change later to be based on some user information
    return true;
  }
  async mint(address: string): Promise<void> {
    let provider: JsonRpcProvider;
    if (this._config.NETWORK === "HardHat") {
      provider = new ethers.JsonRpcProvider(
        `${this._config.hardHat.url}:${this._config.hardHat.port}`
      );
    } else if (this._config.NETWORK === 'Sepolia'){
      provider = new ethers.InfuraProvider('sepolia');
    }else {
      throw new Error(
        `${this.constructor.name}: unkown network. Check your environment variables`
      );
    }
    const wallet = new Wallet(this._config.WALLET_PRIVATE_KEY)
    const signer = wallet.connect(provider)
    
    const contract = new ethers.Contract(token.default.contract.target, token.default.abi, signer);
    try{

      //@ts-expect-error methods are generated at run-time
      await contract.safeMint(address, 'testd-uri')
    }

  }
}
