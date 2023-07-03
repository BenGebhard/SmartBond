// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV2V3Interface.sol";


contract SmartBond {
    string public issuerName;
    address payable public issuerAddress;
    enum PaymentFrequency { Annually, Semiannually }
    uint public maturityDate;
    address payable public owner;
    string public ownerName;
    uint256 public faceValue;
    PaymentFrequency public paymentFrequency;
    uint256 public interestRate;
    AggregatorV3Interface internal ethUsdPriceFeed;

    event redeemerBond(uint amount, uint when);
    event OwnerNameUpdated(string newOwnerName);

    constructor(string memory _issuerName, address payable _issuerAddress, uint _maturityDate, string memory _ownerName, uint256 _faceValue, PaymentFrequency _paymentFrequency, uint _interestRate, address _priceFeedAddress) payable {
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
        issuerAddress = _issuerAddress;
        ethUsdPriceFeed = AggregatorV3Interface(_priceFeedAddress);
    }

    function signBond() public payable {
        int256 ethPrice = getEthPrice();
        uint256 ethFaceValue = convertUsdToEth(faceValue, ethPrice);
        issuerAddress.transfer(ethFaceValue);
    }

    function redeemBond() public payable  {
        emit redeemerBond(address(this).balance, block.timestamp);
        owner.transfer(address(this).balance);
    }

    function payInterestRate() public payable {
        uint interestPayment = (faceValue * interestRate) / 100;
        owner.transfer(interestPayment);
    }

    function getEthPrice() internal view returns (int256) {
        (, int256 price, , , ) = ethUsdPriceFeed.latestRoundData();
        return price;
    }

    function convertUsdToEth(uint256 usdAmount, int256 ethPrice) internal pure returns (uint256) {
        require(ethPrice > 0, "Invalid ETH price");
        return (usdAmount * 1e18) / uint256(ethPrice);
    }
}
