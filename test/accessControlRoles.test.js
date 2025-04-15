// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("Access control roles", function () {
//   let token, admin, minter, user, pauser;

//   beforeEach(async () => {
//     [admin, minter, pauser, user] = await ethers.getSigners();

//     const Token = await ethers.getContractFactory("AccessControlRoles");
//     token = await Token.deploy(admin.address);
//     await token.waitForDeployment();

//     //grant roles
//     await token
//       .connect(admin)
//       .grantRole(await token.MINTER_ROLE(), minter.address);
//     await token
//       .connect(admin)
//       .grantRole(await token.PAUSER_ROLE(), pauser.address);
//   });

//   it("Admin has all roles", async () => {
//     expect(await token.hasRole(await token.DEFAULT_ADMIN_ROLE(), admin.address))
//       .to.be.true;
//     expect(await token.hasRole(await token.MINTER_ROLE(), admin.address)).to.be
//       .true;
//     expect(await token.hasRole(await token.PAUSER_ROLE(), admin.address)).to.be
//       .true;
//   });
// });
