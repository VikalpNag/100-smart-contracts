// const { expect, use } = require("chai");
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

//   it("Minter can mint tokens", async () => {
//     await token.connect(minter).mint(user.address, ethers.parseEther("100"));
//     expect(await token.balanceOf(user.address)).to.be.equal(
//       ethers.parseEther("100")
//     );
//   });

//   it("Non minter cannot mint", async () => {
//     await expect(
//       token.connect(user).mint(user.address, 100)
//     ).to.be.revertedWithCustomError(token, "AccessControlUnauthorizedAccount");
//   });

//   it("Pauser can pause/unpause", async () => {
//     await token.connect(pauser).pause();

//     await expect(
//       token.connect(minter).mint(user.address, ethers.parseEther("10"))
//     ).to.be.revertedWithCustomError(token, "EnforcedPause");

//     await token.connect(pauser).unpause();

//     await token.connect(minter).mint(user.address, ethers.parseEther("10"));
//     expect(await token.balanceOf(user.address)).to.equal(
//       ethers.parseEther("10")
//     );
//   });

//   it("Non pauser can't pause/unpause", async () => {
//     await expect(token.connect(user).pause()).to.be.revertedWithCustomError(
//       token,
//       "AccessControlUnauthorizedAccount"
//     );
//   });
// });
