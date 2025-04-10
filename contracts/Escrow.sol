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

    constructor(address _buyer, address _seller, address _inspector) {
        require(_buyer != address(0), "Invalid buyer");
        require(_seller != address(0), "Innvalid Seller");
        require(_inspector != address(0), "Invalid Inspector");

        buyer = _buyer;
        seller = _seller;
        inspector = _inspector;
    }
}
