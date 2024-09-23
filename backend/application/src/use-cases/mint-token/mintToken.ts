import { INetworkRepository } from "@yeager/domain/minting/INetworkRepository.js";
import { ICommandHander } from "../types.js";
import { MintRequest } from "@yeager/domain/minting/MintRequest.js";
import { MintTokenRequestDto } from "@yeager/dtos/mintTokenDto.js";

export class MintTokenCommandHandler
  implements ICommandHander<MintTokenRequestDto>
{
  readonly _networkRepository: INetworkRepository;

  constructor(networkRepository: INetworkRepository) {
    this._networkRepository = networkRepository;
  }
  async execute(dto: MintTokenRequestDto): Promise<void> {
    const { address, name, description } = dto;
    const mintRequest = await MintRequest.CreateNew(
      address,
      {
        name,
        description,
      },
      this._networkRepository
    );
    await this._networkRepository.mint(mintRequest, dto.asset);
  }
}
