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

//   it("Should delegate calls to logic V1", async () => {
//     const proxied = await ethers.getContractAt(
//       "UpgradeableStorage",
//       await proxy.getAddress()
//     );

//     await proxied.setValue(42);
//     expect(await proxied.getValue()).to.be.equal(42);
//     expect(await proxied.version()).to.be.equal("v1");
//   });

//   it("Should upgrade to logic V2 and use new logic", async () => {
//     const proxied = await ethers.getContractAt(
//       "UpgradeableStorage",
//       await proxy.getAddress()
//     );
//     //set initial value in v1
//     await proxied.setValue(10);
//     expect(await proxied.getValue()).to.be.equal(10);

//     // Deploy V2 logic
//     const LogicV2 = await ethers.getContractFactory("UpgradeableStorageV2");
//     logicV2 = await LogicV2.deploy();
//     await logicV2.waitForDeployment();

//     // Upgrade proxy
//     await proxy.connect(admin).upgradeTo(await logicV2.getAddress());

//     // Attach new ABI to same proxy
//     const proxiedV2 = await ethers.getContractAt(
//       "UpgradeableStorageV2",
//       await proxy.getAddress()
//     );

//     expect(await proxiedV2.version()).to.equal("v2");

//     // In V2, value is multiplied by 2
//     await proxiedV2.setValue(5);
//     expect(await proxiedV2.getValue()).to.equal(10);
//   });
// });
