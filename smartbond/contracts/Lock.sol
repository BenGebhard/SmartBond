// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Lock {
    uint public unlockTime;
    address payable public owner;
    string public ownerName;

    event Withdrawal(uint amount, uint when);
    event UnlockTimeUpdated(uint newUnlockTime);
    event OwnerNameUpdated(string newOwnerName);

    constructor(uint _unlockTime, string memory _ownerName) payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
        owner = payable(msg.sender);
        ownerName = _ownerName;
    }

    function setNewUnlockTime(uint newUnlockTime) public {
        require(
            newUnlockTime > unlockTime,
            "New unlock time should be greater than current unlock time"
        );
        unlockTime = newUnlockTime;

        emit UnlockTimeUpdated(unlockTime);
    }

    function withdraw() public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
}
