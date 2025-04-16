// const { expect } = require("chai");
// const { ethers } = require("hardhat");
// const { MerkleTree } = require("merkletreejs");
// const keccak256 = require("keccak256");

// describe("MerkleMint", function () {
//   let contract, owner, allowlisted, notAllowlisted, merkleRoot, tree;

//   beforeEach(async () => {
//     [owner, allowlisted, notAllowlisted] = await ethers.getSigners();

//     const allowlist = [allowlisted.address];
//     const leaves = allowlist.map((addr) => keccak256(addr));
//     tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
//     merkleRoot = tree.getHexRoot();

//     const MerkleMint = await ethers.getContractFactory("MerkleMint");
//     contract = await MerkleMint.deploy(owner.address, merkleRoot);

//     await contract.waitForDeployment();
//   });

//   it("Should mint NFT for allowlisted user with valid proof", async () => {
//     const proof = tree.getHexProof(keccak256(allowlisted.address));
//     await contract.connect(allowlisted).mint(proof);
//     expect(await contract.ownerOf(1)).to.equal(allowlisted.address);
//   });

//   it("Should not mint for non-allowlisted user", async () => {
//     const fakeProof = tree.getHexProof(keccak256(notAllowlisted.address));
//     await expect(
//       contract.connect(notAllowlisted).mint(fakeProof)
//     ).to.be.revertedWith("Not in Allowlist");
//   });

//   it("Should not allow double minting", async () => {
//     const proof = tree.getHexProof(keccak256(allowlisted.address));
//     await contract.connect(allowlisted).mint(proof);
//     await expect(contract.connect(allowlisted).mint(proof)).to.be.revertedWith(
//       "Already claimed"
//     );
//   });
// });
