import { ValueObject } from "../ValueObject.js";
import { AddressId, INetworkRepository } from "./INetworkRepository.js";
import { UserHavePermissionToMintRule } from "./rules/UserHavePermissionToMintRule.js";

export type Metadata = {
  name: string;
  description: string;
};

export class MintRequest extends ValueObject {
  private readonly _metadata: Metadata;
  private readonly _address: AddressId;

  get address(){
    return this._address
  }
  get metadata(){
    return this._metadata
  }

  // To not allow any external client to create new instances without enforcing rules
  private constructor(address: AddressId, metadata: Metadata) {
    super();
    this._address = address;
    this._metadata = metadata;
  }

  // here we enforce rules
  // TODO: depend on ICounter instead of INetworkRepository
  public static async CreateNew(to: AddressId, metaData: Metadata, networkRepository: INetworkRepository) {
    await this.validateRule(new UserHavePermissionToMintRule(networkRepository, to));
    const newRequest = new MintRequest(to, metaData);
    return newRequest
  }
}
