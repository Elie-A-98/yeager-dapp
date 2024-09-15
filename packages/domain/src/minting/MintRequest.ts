import { ValueObject } from "../ValueObject.js";
import { AddressId, IMinter } from "./IMinter.js";
import { UserDoesntHavePermissionToMintRule } from "./rules/UserDoesntHavePermissionToMintRule.js";

export type Metadata = {
  name: string;
  description: string;
  file: Blob;
};

export class MintRequest extends ValueObject {
  private readonly _metadata: Metadata;
  private readonly _address: AddressId;

  // To not allow any external client to create new instances without enforcing rules
  private constructor(address: AddressId, metadata: Metadata, minter: IMinter) {
    super();
    this._address = address;
    this._metadata = metadata;

    minter.mint(address);
  }

  // here we enforce rules
  public static CreateNew(to: AddressId, metaData: Metadata, minter: IMinter) {
    this.validateRule(new UserDoesntHavePermissionToMintRule(minter, to));
    return new MintRequest(to, metaData, minter);
  }
}
