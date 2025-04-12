const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyERC721", function () {
  let nft, owner, user;

  beforeEach(async () => {
    [owner, user] = await ethers.getSigners();

    const MyERC721 = await ethers.getContractFactory("MyERC721");
    nft = await MyERC721.deploy("MyNFT", "MNFT");
    await nft.waitForDeployment();
  });
});
