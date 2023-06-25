// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract SmartBond {
    address payable public issuer; // Bond created by a company or the government.
    address payable public bondholder; // An individual or entity that owns or holds the bond.
    uint public faceValue; // The amount repaid to the bondholder at maturity.
    uint public maturityDate; // Due date on which the issuer must pay back the full faceValue.
    uint public interestRate; // The amount of interest due per period.
    uint public duration; // The duration of the contract

    // The constructor will be called from the issuer
    constructor(
        //All necessary Parameters for the contract
        address payable _bondholder, 
        uint _faceValue, 
        uint _duration,
        uint _interestRate
    ) payable {
        //Setting the state variables
        issuer = payable(msg.sender);
        bondholder = _bondholder;
        faceValue = _faceValue;
        duration = _duration;
        maturityDate = block.timestamp + duration;
        interestRate = _interestRate;
    }

    //Modifier so explicit functions can only be called by the right address
    modifier onlyBy (address _account) {
        require(msg.sender == _account,
        '"Sender not authorized!'
        );
        _;
    }

    function pay() onlyBy(bondholder) external payable {
        require(faceValue <= address(this).balance, "the faceValue is higher than the balance");
        require(msg.value == faceValue, "Incorrect payment amount");
        (bool success, ) = issuer.call{value: faceValue}("");
        require(success, "Payment failed");

    }

    function payInterest() onlyBy(issuer) external payable {
        //require(block.timestamp >= maturityDate, "Bond has not matured yet.");
        uint interestPayment = (faceValue * interestRate) / 100;
        require(msg.value == interestPayment, "Incorrect payment amount");
        (bool success, ) = payable(bondholder).call{value: interestPayment}("");
        require(success, "Payment failed");
    }

    function redeemBond() onlyBy(bondholder) external payable {
        require(msg.value == faceValue, "Incorrect payment amount");
        require(block.timestamp >= maturityDate, "Bond has not matured yet.");
        (bool success, ) = payable(bondholder).call{value: faceValue}("");
        require(success, "Payment failed");
    }
}