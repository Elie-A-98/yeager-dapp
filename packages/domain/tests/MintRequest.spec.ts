import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { mock, anything, when, instance, verify } from "ts-mockito";
import { Metadata, MintRequest } from "../src/minting/MintRequest.js";
import { BusinessValidationError } from "../src/BusinessValidationError.js";
import { INetworkRepository } from "../src/minting/INetworkRepository.js";

const {expect} = chai
chai.use(chaiAsPromised);

describe("Minting", () => {
  describe("MintRequest", () => {
    const mockedNetworkRepository: INetworkRepository =
      mock<INetworkRepository>();
    const addr1 = "address1";

    it("should fail if the address is not allowed to mint", async () => {
      // Arrange
      when(mockedNetworkRepository.canMint(anything())).thenResolve(false);
      const networkRepository = instance(mockedNetworkRepository);
      const metadata: Metadata = {
        name: "TestName",
        description: "TestFile",
        file: Buffer.from([]),
      };

      // Act + Assert
      await expect(
        MintRequest.CreateNew(addr1, metadata, networkRepository)
      ).to.be.rejectedWith(BusinessValidationError);

      verify(mockedNetworkRepository.canMint(anything())).called();
    });

    it("should succeed if the address is allowed to mint", async () => {
      // Arrange
      when(mockedNetworkRepository.canMint(anything())).thenResolve(true);
      const networkRepository = instance(mockedNetworkRepository);
      const metadata: Metadata = {
        name: "TestName",
        description: "TestFile",
        file: Buffer.from([]),
      };

      // Act + Assert
      await expect(MintRequest.CreateNew(addr1, metadata, networkRepository)).not.to.be.rejectedWith(
        BusinessValidationError
      );
      verify(mockedNetworkRepository.canMint(anything())).called();
    });
  });
});
