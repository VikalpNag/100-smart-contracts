//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract Auction {
    address public seller;
    address public highestBidder;
    uint public highestBid;
    uint public endTime;
    bool public ended;

    mapping(address => uint) public refunds;

    event NewHighestBid(address indexed bidder, uint256 amount);
    event AuctionEnded(address indexed winner, uint256 amount);
    event RefundWithdraw(address indexed bidder, uint256 amount);

    modifier onlySeller() {
        require(msg.sender == seller, "Not the real seller");
    }
}
