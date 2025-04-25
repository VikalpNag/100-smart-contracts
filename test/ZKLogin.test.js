// const { expect } = require("chai");
// const { ethers } = require("hardhat");
// const keccak256 = require("keccak256");
// const { default: MerkleTree } = require("merkletreejs");

// describe("ZKLogin contract", function () {
//   let zkLogin, owner, user1, user2;
//   let tree, root;

//   beforeEach(async () => {
//     [owner, user1, user2] = await ethers.getSigners();

//     const leaves = [user1.address, user2.address].map((addr) =>
//       keccak256(addr)
//     );

//     tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
//     root = tree.getHexRoot();

//     const ZKLogin = await ethers.getContractFactory("ZKLogin");
//     zkLogin = await ZKLogin.deploy(root);
//     await zkLogin.waitForDeployment();
//   });

//   it("Should allow valid user to verify and access restricted area", async () => {
//     const proof = tree.getHexProof(keccak256(user1.address));
//     await zkLogin.connect(user1).verify(proof);
//     expect(await zkLogin.verifiedUsers(user1.address)).to.be.true;

//     const result = await zkLogin.connect(user1).accessRestrictedArea();
//     expect(result).to.be.equal("Welcome to secret zone!");
//   });

//   it("Should reject unverified user from restricted area", async () => {
//     await expect(
//       zkLogin.connect(user2).accessRestrictedArea()
//     ).to.be.revertedWith("Not verified");
//   });
// });
