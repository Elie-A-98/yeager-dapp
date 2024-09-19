import { ValueObject } from "../ValueObject.js";
import { AddressId, INetworkRepository } from "./INetworkRepository.js";
import { UserHavePermissionToMintRule } from "./rules/UserHavePermissionToMintRule.js";

export type Metadata = {
  name: string;
  description: string;
  file: Blob;
};

export class MintRequest extends ValueObject {
  private readonly _metadata: Metadata;
  private readonly _address: AddressId;
  private readonly _uri: string

  get address(){
    return this._address
  }
  get uri(){
    return this._uri
  }
  get metadata(){
    return this._metadata
  }

  // To not allow any external client to create new instances without enforcing rules
  private constructor(address: AddressId, metadata: Metadata, uri:string) {
    super();
    this._address = address;
    this._metadata = metadata;
    this._uri = uri
  }

  // here we enforce rules
  public static async CreateNew(to: AddressId, metaData: Metadata, uri:string, networkRepository: INetworkRepository) {
    await this.validateRule(new UserHavePermissionToMintRule(networkRepository, to));
    const newRequest = new MintRequest(to, metaData, uri);
    return newRequest
  }
}
