import { BusinessRule } from "../../BusinessRule.js";
import { IMinter, AddressId } from "../IMinter.js";

export class UserDoesntHavePermissionToMintRule extends BusinessRule {
  private readonly _minter: IMinter;
  private readonly _address: AddressId;
  constructor(minter: IMinter, address: AddressId) {
    super();
    this._minter = minter;
    this._address = address;
  }
  message = "This user doesn't have permission to mint";
  isBroken(): boolean {
    return !this._minter.canMint(this._address);
  }
}
