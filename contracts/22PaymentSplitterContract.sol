// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title PaymentSplitterContract
 * @dev Splits ETH or token payments among a group of payees based on their shares.
 */

contract PaymentSplitterContract is Context {
    using Address for address payable;

    uint256 public totalShares;
    uint256 public totalReleased;

    mapping(address => uint256) public shares;
    mapping(address => uint256) public released;
    address[] public payees;

    constructor(address[] memory _payees, uint256[] memory _shares) {
        require(
            _payees.length == _shares.length,
            "payees and shares length mismatch"
        );
        require(_payees.length > 0, "No payees");

        for (uint256 i = 0; i < _payees.length; i++) {
            _addPayee(_payees[i], _shares[i]);
        }
    }
    receive external payable{}

    function release(address payable account)public{
        require(shares[account]>0,"Account has no shares");

         uint256 totalReceived=address(this).balance+totalReleased;
         uint256 payment=_pendingPayment(account,totalReceived,released[account]);

         require(payment>0,"No payment due");

         release[account]+=payment;
         totalReleased+=payment;

         account.sendValue(payment);

    }

    function _pendingPayment(address account,uint256 totalReceived,uint256 alreadyReleased) private view returns(uint256){
        return(totalReceived*shares[account])/totalShares-alreadyReleased;
    }
}
