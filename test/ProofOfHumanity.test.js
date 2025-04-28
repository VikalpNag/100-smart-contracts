// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("ProofOfHumanity", function () {
//   let proofOfHumanity, owner, user1, user2;

//   beforeEach(async () => {
//     [owner, user1, user2] = await ethers.getSigners();

//     const ProofOfHumanity = await ethers.getContractFactory("ProofOfHumanity");
//     proofOfHumanity = await ProofOfHumanity.deploy();
//     await proofOfHumanity.waitForDeployment();
//   });

//   it("Allows user to register once", async () => {
//     await proofOfHumanity.connect(user1).register();

//     expect(await proofOfHumanity.isRegistered(user1.address)).to.equal(true);
//     expect(await proofOfHumanity.totalHumans()).to.be.equal(1);

//     //Should revert if tries again
//     await expect(proofOfHumanity.connect(user1).register()).to.be.revertedWith(
//       "Already Registered"
//     );
//   });

//   it("Allows owner to admin register", async () => {
//     await proofOfHumanity.adminRegister(user2.address);

//     expect(await proofOfHumanity.isRegistered(user2.address)).to.equal(true);
//     expect(await proofOfHumanity.totalHumans()).to.equal(1);
//   });

//   it("Non-owner cannot call adminRegister", async () => {
//     await expect(
//       proofOfHumanity.connect(user1).adminRegister(user2.address)
//     ).to.be.revertedWithCustomError(
//       proofOfHumanity,
//       "OwnableUnauthorizedAccount"
//     );
//   });
// });
