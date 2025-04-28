// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("AutoRaffle", function () {
//   let raffle, owner, user1, user2, user3;

//   beforeEach(async () => {
//     [owner, user1, user2, user3] = await ethers.getSigners();

//     const AutoRaffle = await ethers.getContractFactory("AutoRaffle");
//     raffle = await AutoRaffle.deploy();
//     await raffle.waitForDeployment();
//   });

//   it("Users can enter raffle", async () => {
//     await raffle.connect(user1).enterRaffle({ value: ethers.parseEther("1") });
//     await raffle.connect(user2).enterRaffle({ value: ethers.parseEther("2") });

//     const participants = await raffle.getParticipants();
//     expect(participants).to.have.lengthOf(2);
//     expect(participants[0]).to.equal(user1.address);
//     expect(participants[1]).to.equal(user2.address);
//   });

//   it("Only owner can pick winner", async () => {
//     await expect(
//       raffle.connect(user1).pickWinner(42)
//     ).to.be.revertedWithCustomError(raffle, "OwnableUnauthorizedAccount");
//   });

//   it("Picks a winner and sends prize", async () => {
//     await raffle.connect(user1).enterRaffle({ value: ethers.parseEther("1") });
//     await raffle.connect(user2).enterRaffle({ value: ethers.parseEther("2") });
//     await raffle.connect(user3).enterRaffle({ value: ethers.parseEther("3") });

//     const balanceBefore = await ethers.provider.getBalance(user2.address);

//     // Admin picks winner with randomNumber = 1 (so index = 1)
//     await expect(raffle.connect(owner).pickWinner(1)).to.emit(
//       raffle,
//       "WinnerPicked"
//     );

//     const balanceAfter = await ethers.provider.getBalance(user2.address);

//     // (balanceAfter - balanceBefore) should be approximately 6 ETH
//     const diff = balanceAfter - balanceBefore;
//     expect(diff).to.be.closeTo(
//       ethers.parseEther("6"),
//       ethers.parseEther("0.01")
//     );

//     const participants = await raffle.getParticipants();
//     expect(participants.length).to.equal(0); // reset
//   });
// });
