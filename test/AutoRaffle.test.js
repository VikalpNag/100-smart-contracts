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
// });
