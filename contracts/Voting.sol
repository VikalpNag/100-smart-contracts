//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;

contract Voting {
    mapping(string => uint256) public votes;
    string[] public candidates;

    function addCandidates(string memory _name) public {
        candidates.push(_name);
    }

    function vote(string memory _name) public {
        votes[_name] += 1;
    }
}
