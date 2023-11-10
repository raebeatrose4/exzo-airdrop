// SPDX-License-Identifier: Unlicensed
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ClaimableAirdrop is Ownable {
    IERC20 public xzo;
    mapping(address => uint256) public addressBalance;
    uint256 public claims;

    constructor(address _xzoAddress, address _initialOwner) Ownable(_initialOwner) {
        xzo = IERC20(_xzoAddress);
        claims = 0;
    }

    function setAddressAndBalance(address[] memory addresses, uint256[] memory balances) public onlyOwner {
        require(addresses.length == balances.length, "Invalid input");
        for (uint256 i; i < addresses.length; i++) {
            addressBalance[addresses[i]] = balances[i];
        }
    }

    function claim() external {
        require(addressBalance[msg.sender] > 0, "You own nothing");
        require(xzo.transfer(msg.sender, addressBalance[msg.sender]), "Token transfer failed");
        addressBalance[msg.sender] = 0;
        claims+=1;
    }

    function getClaimsCount() public view returns(uint256){
        return claims;
    }

    function withdraw() external onlyOwner {
        uint256 contractBalance = xzo.balanceOf(address(this));
        require(contractBalance > 0, "No XZO balance in the contract");
        require(xzo.transfer(owner(), contractBalance), "Token transfer failed");
    }
}
