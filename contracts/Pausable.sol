//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract Pausable {
    address public owner;
    bool public paused;

    event Paused();
    event UnPaused();
}
