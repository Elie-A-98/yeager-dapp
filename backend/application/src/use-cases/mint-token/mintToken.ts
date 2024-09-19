import { INetworkRepository } from "@yeager/domain/minting/INetworkRepository.js";
import { MintTokenRequestDto } from "./dto.js";
import { ICommandHander } from "../types.js";
import { MintRequest } from "@yeager/domain/minting/MintRequest.js";

export class MintTokenCommandHandler
  implements ICommandHander<MintTokenRequestDto>
{
  readonly _networkRepository: INetworkRepository;

  constructor(networkRepository: INetworkRepository) {
    this._networkRepository = networkRepository;
  }
  async execute(dto: MintTokenRequestDto): Promise<void> {
    const { address, name, description, file } = dto;

    const mintRequest = await MintRequest.CreateNew(
      address,
      {
        name,
        description,
        file: file.buffer,
      },
      this._networkRepository
    );
    await this._networkRepository.mint(mintRequest);
  }
}
