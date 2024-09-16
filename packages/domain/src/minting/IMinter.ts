export type AddressId = string

export interface IMinter<TAddress extends AddressId = AddressId> {
    canMint(address: TAddress): Promise<boolean>;
    mint(address: TAddress): Promise<void>;
}