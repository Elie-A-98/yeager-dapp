export type AddressId = string

export interface IMinter<TAddress extends AddressId = AddressId> {
    canMint(address: TAddress): boolean;
    mint(address: TAddress): void;
}