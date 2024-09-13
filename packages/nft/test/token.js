const {
  increaseTo,
} = require("@nomicfoundation/hardhat-network-helpers/dist/src/helpers/time");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token", () => {
  let token;
  let owner;
  let addr1;
  let uri1 = "uri1";
  let addr2;
  let uri2 = "uri2";

  before(async () => {
    [owner, addr1, addr2] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("Token");
    token = await Token.deploy(owner.address);
  });

  describe("Minting", () => {
    it("Should prevent non-owner from minting", async function () {
      await expect(token.connect(addr1).safeMint(addr2, uri2)).to.be.reverted;
    });

    it("Should allow owner to mint", async function () {
      await token.safeMint(addr1, uri1)
      expect(await token.balanceOf(addr1.address)).to.equal(1)
    });
  });

  describe("Transactions", () => {
    it("should transfer tokens between accounts", async () => {
      await token.safeMint(addr1, uri1)
      const totalSupply = await token.totalSupply();
      let tokenId = undefined
      for(let i = 0; i < totalSupply; i ++){
        const currentOwnerAddress = await token.ownerOf(i)
        if(currentOwnerAddress === addr1.address) tokenId = i
      }
      expect(tokenId).not.equal(undefined)
      await token.connect(addr1).safeTransferFrom(addr1.address, addr2.address, tokenId)

      const newOwner = await token.ownerOf(tokenId)
      expect(newOwner).to.equal(addr2.address)
    });
  });
});
