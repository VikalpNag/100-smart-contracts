// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("CredentialVerifier", function () {
//   let owner, user;
//   let credentialVerifier;

//   beforeEach(async () => {
//     [owner, user] = await ethers.getSigners();

//     const CredentialVerifier = await ethers.getContractFactory(
//       "CredentialVerifier"
//     );
//     credentialVerifier = await CredentialVerifier.deploy();
//     await credentialVerifier.waitForDeployment();
//   });

//   it("Should store a valid credential hash", async () => {
//     const credential = "Bachelor of Technology 2025";
//     const credentialHash = ethers.utils.keccak256(
//       ethers.utils.toUtf8Bytes(credential)
//     );

//     await credentialVerifier.connect(user).storeCredential(credentialHash);

//     const storedHash = await credentialVerifier.credentials(user.address);
//     expect(storedHash).to.equal(credentialHash);
//   });
//   it("Should verify a correct credential", async () => {
//     const credential = "Bachelor of Science 2024";
//     const credentialHash = ethers.utils.keccak256(
//       ethers.utils.toUtf8Bytes(credential)
//     );

//     // Store credential for user
//     await credentialVerifier.connect(user).storeCredential(credentialHash);

//     // Verify that the credential matches
//     const isValid = await credentialVerifier.verifyCredential(
//       user.address,
//       credential
//     );
//     expect(isValid).to.be.true;
//   });

//   it("Should allow an admin to verify any user's credential", async () => {
//     const credential = "Bachelor of Science 2024";
//     const credentialHash = ethers.utils.keccak256(
//       ethers.utils.toUtf8Bytes(credential)
//     );

//     // Store credential for user
//     await credentialVerifier.connect(user).storeCredential(credentialHash);

//     // Verify user credential from admin's perspective
//     const isValid = await credentialVerifier
//       .connect(owner)
//       .verifyUserCredential(user.address, credential);
//     expect(isValid).to.be.true;
//   });

//   it("Should reject verification from non-admin user for other user's credentials", async () => {
//     const credential = "Bachelor of Science 2024";
//     const credentialHash = ethers.utils.keccak256(
//       ethers.utils.toUtf8Bytes(credential)
//     );

//     // Store credential for user
//     await credentialVerifier.connect(user).storeCredential(credentialHash);

//     // Try to verify user credential from another user (non-admin)
//     await expect(
//       credentialVerifier
//         .connect(user)
//         .verifyUserCredential(owner.address, credential)
//     ).to.be.revertedWith("Only admin can verify other users' credentials");
//   });
// });
