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
        _;
    }

    modifier auctionActive() {
        require(block.timestamp < endTime, "Auction time ended");
        _;
    }

    modifier auctionEnded() {
        require(block.timestamp >= endTime, "Auction not ended yet");
    }

    constructor(uint _biddingDurationInSeconds) {
        require(_biddingDurationInSeconds > 0, "Duration must be >0");
        seller = msg.sender;
        endTime = block.timestamp + _biddingDurationInSeconds;
    }

    function bid() external payable auctionActive {
        require(msg.value > highestBid, "Bid not higher than current highest");

        if (highestBid != 0) {
            refunds[highestBidder] += highestBid;
        }

        highestBidder = msg.sender;
        highestBid = msg.value;
        emit NewHighestBid(msg.sender, msg.value);
    }

    function withdrawFund() external {
        uint amount = refunds[msg.sender];
        require(amount > 0, "No funds to withdraw");

        refunds[msg.sender]=0;
        payable(msg.sender).transfer(amount);

        emit(RefundWithdraw(msg.sender, amount);)
    }

    function endAuction() external onlySeller auctionEnded{
        require(!ended,"Auction already ended");

        ended=true;
        payable(seller).transfer(highestBid);
        emit AuctionEnded(highestBidder,highestBid);
    }
}
