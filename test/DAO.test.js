// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("DAO contract", function () {
//   let token, dao, dummy;
//   let owner, voter1, voter2;

//   beforeEach(async () => {
//     [owner, voter1, voter2] = await ethers.getSigners();

//     //Token
//     const Token = await ethers.getContractFactory("ACustomERC20");
//     token = await Token.deploy(
//       "Governance",
//       "GOV",
//       ethers.parseEther("100000")
//     );
//     await token.transfer(voter1.address, ethers.parseEther("10"));
//     await token.transfer(voter2.address, ethers.parseEther("10"));

//     //Dummy Target
//     const Dummy = await ethers.getContractFactory("DummyTarget");
//     dummy = await Dummy.deploy();

//     //DAO contract
//     const DAO = await ethers.getContractFactory("DAO");
//     dao = await DAO.deploy(token.target);

//     await token.connect(voter1).approve(dao.target, ethers.parseEther("10"));
//     await token.connect(voter2).approve(dao.target, ethers.parseEther("10"));
//   });
// });
