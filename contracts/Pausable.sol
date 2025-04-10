//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract Pausable {
    address public owner;
    bool public paused;

    event Paused();
    event UnPaused();

    constructor() {
        owner = msg.sender;
        paused = false;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    modifier whenNotPaused() {
        require(!paused, "Contract is paused");
        _;
    }

    modifier whenPaused() {
        require(paused, "Contract is not paused");
        _;
    }

    function pause() external onlyOwner whenNotPaused {
        paused = true;
        emit Paused();
    }

    function unPause() external onlyOwner whenPaused {
        paused = false;
        emit UnPaused();
    }
}
