// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract SmartBond {
    enum PaymentFrequency { Annually, Semiannually }
    uint public maturityDate;
    address payable public owner;
    string public ownerName;
    string public issuerName;
    uint public faceValue;
    PaymentFrequency public paymentFrequency;
    uint public interestRate;

    event Withdrawal(uint amount, uint when);
    event OwnerNameUpdated(string newOwnerName);

    constructor(uint _maturityDate, string memory _ownerName, string memory _issuerName, uint _faceValue, PaymentFrequency _paymentFrequency, uint _interestRate) payable {
        require(
            block.timestamp < _maturityDate,
            "Unlock time should be in the future"
        );

        maturityDate = _maturityDate;
        owner = payable(msg.sender);
        ownerName = _ownerName;
        issuerName = _issuerName;
        faceValue = _faceValue;
        paymentFrequency = _paymentFrequency;
        interestRate = _interestRate;
    }

    function payInterestRate() public {
        owner.transfer(address(this).balance);
        
    }

    function redeemBond() public  {
        owner.transfer(address(this).balance);
    }
}
