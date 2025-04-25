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
// });
