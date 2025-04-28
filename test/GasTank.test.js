// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("GasTank", function () {
//   let gasTank, owner, user1, user2, relayer;

//   beforeEach(async () => {
//     [owner, user1, user2, relayer] = await ethers.getSigners();

//     const GasTank = await ethers.getContractFactory("GasTank");
//     gasTank = await GasTank.deploy();
//     await gasTank.waitForDeployment();
//   });

//   it("Allows users to deposit ETH", async () => {
//     await gasTank
//       .connect(user1)
//       .depositForUser(user1.address, { value: ethers.parseEther("1") });

//     const balance = await gasTank.userBalance(user1.address);
//     expect(balance).to.equal(ethers.parseEther("1"));
//   });

//   it("Allows owner to add a relayer", async () => {
//     await gasTank.connect(owner).setRelayer(relayer.address, true);
//     expect(await gasTank.relayers(relayer.address)).to.equal(true);
//   });

//   it("Relayer can spend user's gas", async () => {
//     await gasTank.connect(owner).setRelayer(relayer.address, true);

//     await gasTank
//       .connect(user2)
//       .depositForUser(user2.address, { value: ethers.parseEther("2") });

//     const relayerBalanceBefore = await ethers.provider.getBalance(
//       relayer.address
//     );

//     await gasTank
//       .connect(relayer)
//       .spendGas(user2.address, ethers.parseEther("1"));

//     const userBalanceAfter = await gasTank.userBalance(user2.address);
//     expect(userBalanceAfter).to.equal(ethers.parseEther("1")); // 2 - 1 = 1

//     const relayerBalanceAfter = await ethers.provider.getBalance(
//       relayer.address
//     );
//     expect(relayerBalanceAfter).to.be.gt(relayerBalanceBefore);
//   });

//   it("Non-relayers cannot spend gas", async () => {
//     await expect(
//       gasTank.connect(user1).spendGas(user2.address, ethers.parseEther("1"))
//     ).to.be.revertedWith("Not an authorized relayer");
//   });
// });
