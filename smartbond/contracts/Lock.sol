// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Lock {
    uint public maturityDate;
    address payable public owner;
    string public ownerName;
    uint public faceValue;

    event Withdrawal(uint amount, uint when);
    event UnlockTimeUpdated(uint newUnlockTime);
    event OwnerNameUpdated(string newOwnerName);

    constructor(uint _maturityDate, string memory _ownerName, uint _faceValue) payable {
        require(
            block.timestamp < _maturityDate,
            "Unlock time should be in the future"
        );

        maturityDate = _maturityDate;
        owner = payable(msg.sender);
        ownerName = _ownerName;
        faceValue = _faceValue;
    }

    function setNewUnlockTime(uint newUnlockTime) public {
        require(
            newUnlockTime > maturityDate,
            "New unlock time should be greater than current unlock time"
        );
        maturityDate = newUnlockTime;

        emit UnlockTimeUpdated(maturityDate);
    }

    function withdraw() public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", maturityDate, block.timestamp);

        require(block.timestamp >= maturityDate, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
}
