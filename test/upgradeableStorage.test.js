// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("Upgradeable Storage", function () {
//   let proxy, logicV1, logicV2;
//   let admin, user;

//   beforeEach(async () => {
//     [admin, user] = await ethers.getSigners();

//     //Deploy V1  logic
//     const LogicV1 = await ethers.getContractFactory("UpgradeableStorage");
//     logicV1 = await LogicV1.deploy();
//     await logicV1.waitForDeployment();

//     // Deploy Proxy with V1 logic
//     const Proxy = await ethers.getContractFactory("StorageProxy");
//     proxy = await Proxy.deploy(await logicV1.getAddress());
//     await proxy.waitForDeployment();
//   });
// });
