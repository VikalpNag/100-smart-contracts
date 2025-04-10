//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Escrow {
    address public buyer;
    address public seller;
    address public inspector;

    uint public amount;
    bool public isFunded;
    bool public isRealesed;
    bool public isRefunded;
}
