export type AddressId = unknown

export interface IMinter<TAddress extends AddressId = AddressId> {
    canMint(address: TAddress): boolean;
}