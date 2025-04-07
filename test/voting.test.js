const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Voting", function () {
  let voting;

  beforeEach(async () => {
    const Voting = await ethers.getContractFactory("Voting");
    voting = await Voting.deploy();
    await voting.waitForDeployment();
  });

  it("Returns Add Candidates", async () => {
    await voting.addCandidates("Vikalp");
    await voting.addCandidates("Ruby");
    await voting.addCandidates("Aditya");

    const candidate0 = await voting.candidates(0);
    const candidate1 = await voting.candidates(1);
    const candidate2 = await voting.candidates(2);

    expect(candidate0).to.be.equal("Vikalp");
    expect(candidate1).to.be.equal("Ruby");
    expect(candidate2).to.be.equal("Aditya");
  });

  it("Return Vote", async () => {
    await voting.vote("Vikalp");
    await voting.vote("Vikalp");
    await voting.vote("Ruby");

    const votesVikalp = await voting.votes("Vikalp");
    const votesRuby = await voting.votes("Ruby");
    const votesAditya = await voting.votes("Aditya");

    expect(votesVikalp).to.be.equal(2);
    expect(votesRuby).to.be.equal(1);
    expect(votesAditya).to.be.equal(0);
  });
});
