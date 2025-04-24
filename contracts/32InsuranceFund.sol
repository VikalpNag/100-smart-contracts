// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InsuranceFund {
    struct Claim {
        address claimant;
        uint256 amount;
        string reason;
        bool approved;
        bool paid;
    }

    mapping(uint256 => Claim) public claims;
    uint256 public claimCount;

    mapping(address => uint256) public deposits;
    uint256 public totalPool;

    event Deposited(address indexed user, uint256 amount);
    event ClaimSubmitted(
        uint256 claimId,
        address indexed user,
        uint256 amount,
        string reason
    );
    event ClaimApproved(uint256 claimId);
    event ClaimRejected(uint256 claimId);
    event ClaimPaid(uint256 claimId, address indexed to, uint256 amount);

    //users deposit ETH into the insurance pool
    function deposit() external payable {
        require(msg.value > 0, "Must send ETH");
        deposits[msg.sender] += msg.value;
        totalPool += msg.value;
        emit Deposited(msg.sender, msg.value);
    }

    //Submit a claim with a reason
    function submitClaim(uint256 amount, string memory reason) external {
        require(amount > 0, "Invalid amount");

        claims[claimCount] = Claim({
            claimant: msg.sender,
            amount: amount,
            reason: reason,
            approved: false,
            paid: false
        });
        emit ClaimSubmitted(claimCount, msg.sender, amount, reason);
        claimCount++;
    }
}
