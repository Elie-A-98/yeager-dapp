import { expect } from "chai";
import { mock, anything, when, instance, verify } from "ts-mockito";
import { IMinter } from "../src/minting/IMinter.js";
import { Metadata, MintRequest } from "../src/minting/MintRequest.js";
import { BusinessValidationError } from "../src/BusinessValidationError.js";

describe("Minting", () => {
  describe("MintRequest", () => {
    let mockedMinter: IMinter = mock<IMinter>();
    let addr1 = "address1";

    it("should fail if the address is not allowed to mint", () => {
      // Arrange
      when(mockedMinter.canMint(anything())).thenReturn(false);
      let minter = instance(mockedMinter);
      const metadata: Metadata = {
        name: "TestName",
        description: "TestFile",
        file: new Blob([]),
      };

      // Act + Assert
      expect(() => MintRequest.CreateNew(addr1, metadata, minter)).throw(
        BusinessValidationError
      );
      verify(mockedMinter.canMint(anything())).called();
    });

    it("should succeed if the address is allowed to mint", () => {
      // Arrange
      when(mockedMinter.canMint(anything())).thenReturn(true);
      let minter = instance(mockedMinter);
      const metadata: Metadata = {
        name: "TestName",
        description: "TestFile",
        file: new Blob([]),
      };

      // Act + Assert
      expect(() => MintRequest.CreateNew(addr1, metadata, minter)).not.throw(
        BusinessValidationError
      );
      verify(mockedMinter.canMint(anything())).called();
    });
  });
});
