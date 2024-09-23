import { MintRequest } from "./MintRequest.js";

export type AddressId = string

export interface INetworkRepository<TAddress extends AddressId = AddressId> {
    canMint(address: TAddress): Promise<boolean>;
    mint(mintRequest: MintRequest, asset: Blob): Promise<void>;
}