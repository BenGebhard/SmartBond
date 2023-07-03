// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV2V3Interface.sol";


contract SmartBond {
    string public issuerName;
    address payable public issuerAddress;
    address payable public owner;
    string public ownerName;
    uint public maturityDate;
    uint public faceValue;
    uint public interestRate;
    PaymentFrequency public paymentFrequency;
    enum PaymentFrequency { Annually, Semiannually }
    AggregatorV3Interface internal ethUsdPriceFeed;

    event redeemerBond(uint amount, uint when);

    constructor(string memory _issuerName, address payable _issuerAddress, string memory _ownerName, uint _maturityDate, uint _faceValue, uint _interestRate, PaymentFrequency _paymentFrequency, address _priceFeedAddress) payable {
        require(
            block.timestamp < _maturityDate,
            "Unlock time should be in the future"
        );

        owner = payable(msg.sender);
        issuerName = _issuerName;
        issuerAddress = _issuerAddress;
        ownerName = _ownerName;
        maturityDate = _maturityDate;
        faceValue = _faceValue;
        interestRate = _interestRate;
        paymentFrequency = _paymentFrequency;
        ethUsdPriceFeed = AggregatorV3Interface(_priceFeedAddress);
    }

    //function to transfer the faceValue in Ether to the issuerAddress.
    function signBond() public payable {
        int256 ethPrice = getEthPrice();
        uint256 ethFaceValue = convertUsdToEth(faceValue, ethPrice);
        issuerAddress.transfer(ethFaceValue);
    }

    //function emits an event to notify the redemption of the bond, calculates the Ether face value of
    //the bond based on the current Ethereum price, and transfers the corresponding Ether amount to the owner address.
    function redeemBond() public payable  {
        emit redeemerBond(address(this).balance, block.timestamp);
        int256 ethPrice = getEthPrice();
        uint256 ethFaceValue = convertUsdToEth(faceValue, ethPrice);
        owner.transfer(ethFaceValue);
    }

    //function calculates and transfers the interest payment amount from the contract to the owner address
    function payInterestRate() public payable {
        uint interestPayment = (faceValue * interestRate) / 100;
        owner.transfer(interestPayment);
    }

    //function to retrieve the current Ethereum price in USD.
    function getEthPrice() internal view returns (int256) {
        (, int256 price, , , ) = ethUsdPriceFeed.latestRoundData();
        return price;
    }

    //function to convert the faceValue from USD to an equivalent value in ETH, based on the current Ethereum price.
    function convertUsdToEth(uint256 usdAmount, int256 ethPrice) internal pure returns (uint256) {
        require(ethPrice > 0, "Invalid ETH price");
        return (usdAmount * 1e18) / uint256(ethPrice);
    }
}
