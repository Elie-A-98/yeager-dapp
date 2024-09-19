import { BusinessRule } from "../../BusinessRule.js";
import { AddressId, INetworkRepository } from "../INetworkRepository.js";

export class UserHavePermissionToMintRule extends BusinessRule {
  private readonly _networkRepository: INetworkRepository;
  private readonly _address: AddressId;
  constructor(networkRepository: INetworkRepository, address: AddressId) {
    super();
    this._networkRepository = networkRepository;
    this._address = address;
  }
  message = "This user doesn't have permission to mint";
  async isBroken() {
    return !(await this._networkRepository.canMint(this._address));
  }
}
