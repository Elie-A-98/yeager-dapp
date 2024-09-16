import { AddressId, IMinter } from 'yeager-domain';
import { ICommandHander } from "./types.js";

export class MintTokenCommandHandler
  implements
    ICommandHander<{
      address: AddressId;
    }>
{
  readonly _minter: IMinter;

  constructor(minter: IMinter) {
    this._minter = minter;
  }
  async execute(request: { address: AddressId }): Promise<void> {
    const { address } = request;
    await this._minter.mint(address);
  }
}
