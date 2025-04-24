// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("GaslessVoting", function () {
//   let voting, user1, user2;

//   beforeEach(async () => {
//     [owner, user1, user2] = await ethers.getSigners();
//     const Voting = await ethers.getContractFactory("GaslessVoting");
//     voting = await Voting.deploy();
//   });

//   it("Should allow valid EIP712 signature to vote", async () => {
//     const domain = {
//       name: "GaslessVoting",
//       version: "1",
//       chainId: (await ethers.provider.getNetwork()).chainId,
//       verifyingContract: voting.target,
//     };

//     const types = {
//       Vote: [
//         { name: "voter", type: "address" },
//         { name: "proposalId", type: "uint256" },
//         { name: "support", type: "bool" },
//         { name: "nonce", type: "uint256" },
//       ],
//     };

//     const value = {
//       voter: user1.address,
//       proposalId: 0,
//       support: true,
//       nonce: 0,
//     };

//     const signature = await user1.signTypedData(domain, types, value);

//     await voting.submitVote(user1.address, 0, true, 0, signature);

//     const votes = await voting.getVotes(0);
//     expect(votes[0]).to.equal(1);
//     expect(votes[1]).to.equal(0);
//   });

//   it("Should reject reused signature", async () => {
//     const domain = {
//       name: "GaslessVoting",
//       version: "1",
//       chainId: (await ethers.provider.getNetwork()).chainId,
//       verifyingContract: voting.target,
//     };

//     const types = {
//       Vote: [
//         { name: "voter", type: "address" },
//         { name: "proposalId", type: "uint256" },
//         { name: "support", type: "bool" },
//         { name: "nonce", type: "uint256" },
//       ],
//     };

//     const value = {
//       voter: user1.address,
//       proposalId: 0,
//       support: true,
//       nonce: 0,
//     };

//     const sig = await user1.signTypedData(domain, types, value);
//     await voting.submitVote(user1.address, 0, true, 0, sig);

//     // Try submitting again
//     await expect(
//       voting.submitVote(user1.address, 0, true, 0, sig)
//     ).to.be.revertedWith("Invalid nonce");
//   });
// });
