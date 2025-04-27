// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("CrossChainBridge", function () {
//   let owner, user, bridge, token;

//   const initialSupply = ethers.parseEther("100000");
//   const amountToBridge = ethers.parseEther("1000");

//   beforeEach(async () => {
//     [owner, user] = await ethers.getSigners();

//     const ERC20Mintable = await ethers.getContractFactory("ERC20Mintable");
//     token = await ERC20Mintable.deploy("Test Token", "TTK");
//     await token.waitForDeployment();
//     await token.mint(user.address, initialSupply);

//     const Bridge = await ethers.getContractFactory("CrossChainBridge");
//     bridge = await Bridge.deploy(token.target);
//     await bridge.waitForDeployment();
//   });
// });
