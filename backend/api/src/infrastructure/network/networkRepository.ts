import { INetworkRepository } from "@yeager/domain/minting/INetworkRepository.js";
import { NetworkConnectionFactory } from "./connectionFactory.js";
import { getCount } from "../counter/Counter.js";
import { MintRequest } from "@yeager/domain/minting/MintRequest.js";

export class NetworkRepository implements INetworkRepository {
  private readonly _networkConnectionFactory: NetworkConnectionFactory;
  constructor(factory: NetworkConnectionFactory) {
    this._networkConnectionFactory = factory;
  }
  async mint(mintRequest: MintRequest) {
    const connection = await this._networkConnectionFactory.getOpenConnection();

    const { IpfsHash: fileIpfsHash } = await connection.pinata.upload
      .file(
        new File([mintRequest.metadata.file], mintRequest.metadata.name, {
          type: "text/plain",
        })
      )
      .then()
      .catch((err) => {
        Error.captureStackTrace(err);
        throw err;
      });

    const { IpfsHash: uri } = await connection.pinata.upload
      .json({
        name: mintRequest.metadata.name,
        description: mintRequest.metadata.description,
        uri: `ipfs://${fileIpfsHash}`,
      })
      .then()
      .catch((err) => {
        Error.captureStackTrace(err);
        throw err;
      });

    await connection.contract
      .safeMint(mintRequest.address, uri)
      .catch((err) => {
        Error.captureStackTrace(err);
        throw err;
      });
  }
  async canMint(): Promise<boolean> {
    return getCount() % 2 === 0;
  }
}
