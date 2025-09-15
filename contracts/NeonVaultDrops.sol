// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract NeonVaultDrops is SepoliaConfig {
    using FHE for *;
    
    struct VaultDrop {
        euint32 dropId;
        euint32 totalSupply;
        euint32 currentSupply;
        euint32 price;
        euint32 rarity;
        bool isActive;
        bool isRevealed;
        string name;
        string description;
        string imageUri;
        address creator;
        uint256 startTime;
        uint256 endTime;
        uint256 revealTime;
    }
    
    struct NFT {
        euint32 tokenId;
        euint32 dropId;
        euint32 rarity;
        bool isRevealed;
        address owner;
        uint256 mintTime;
    }
    
    struct UserProfile {
        euint32 totalMints;
        euint32 totalSpent;
        euint32 reputation;
        bool isVerified;
        address userAddress;
    }
    
    mapping(uint256 => VaultDrop) public vaultDrops;
    mapping(uint256 => NFT) public nfts;
    mapping(address => UserProfile) public userProfiles;
    mapping(address => mapping(uint256 => bool)) public userMinted;
    
    uint256 public dropCounter;
    uint256 public nftCounter;
    
    address public owner;
    address public verifier;
    
    event DropCreated(uint256 indexed dropId, address indexed creator, string name);
    event NFTPurchased(uint256 indexed tokenId, uint256 indexed dropId, address indexed buyer, uint32 price);
    event DropRevealed(uint256 indexed dropId, uint32 totalRarity);
    event UserVerified(address indexed user, bool isVerified);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function createVaultDrop(
        string memory _name,
        string memory _description,
        string memory _imageUri,
        uint256 _totalSupply,
        uint256 _price,
        uint256 _duration,
        uint256 _revealDelay
    ) public returns (uint256) {
        require(bytes(_name).length > 0, "Drop name cannot be empty");
        require(_totalSupply > 0, "Total supply must be positive");
        require(_duration > 0, "Duration must be positive");
        
        uint256 dropId = dropCounter++;
        
        vaultDrops[dropId] = VaultDrop({
            dropId: FHE.asEuint32(0), // Will be set properly later
            totalSupply: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            currentSupply: FHE.asEuint32(0),
            price: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            rarity: FHE.asEuint32(0), // Will be set during reveal
            isActive: true,
            isRevealed: false,
            name: _name,
            description: _description,
            imageUri: _imageUri,
            creator: msg.sender,
            startTime: block.timestamp,
            endTime: block.timestamp + _duration,
            revealTime: block.timestamp + _duration + _revealDelay
        });
        
        emit DropCreated(dropId, msg.sender, _name);
        return dropId;
    }
    
    function purchaseNFT(
        uint256 dropId,
        externalEuint32 price,
        bytes calldata inputProof
    ) public payable returns (uint256) {
        require(vaultDrops[dropId].creator != address(0), "Drop does not exist");
        require(vaultDrops[dropId].isActive, "Drop is not active");
        require(block.timestamp >= vaultDrops[dropId].startTime, "Drop has not started");
        require(block.timestamp <= vaultDrops[dropId].endTime, "Drop has ended");
        require(!userMinted[msg.sender][dropId], "User already minted from this drop");
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalPrice = FHE.fromExternal(price, inputProof);
        
        // Check if user has enough balance (this would be done off-chain)
        // For now, we'll assume the payment is valid
        
        uint256 tokenId = nftCounter++;
        
        nfts[tokenId] = NFT({
            tokenId: FHE.asEuint32(0), // Will be set properly later
            dropId: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            rarity: FHE.asEuint32(0), // Will be set during reveal
            isRevealed: false,
            owner: msg.sender,
            mintTime: block.timestamp
        });
        
        // Update drop totals
        vaultDrops[dropId].currentSupply = FHE.add(vaultDrops[dropId].currentSupply, FHE.asEuint32(1));
        
        // Update user profile
        if (userProfiles[msg.sender].userAddress == address(0)) {
            userProfiles[msg.sender] = UserProfile({
                totalMints: FHE.asEuint32(0),
                totalSpent: FHE.asEuint32(0),
                reputation: FHE.asEuint32(0),
                isVerified: false,
                userAddress: msg.sender
            });
        }
        
        userProfiles[msg.sender].totalMints = FHE.add(userProfiles[msg.sender].totalMints, FHE.asEuint32(1));
        userProfiles[msg.sender].totalSpent = FHE.add(userProfiles[msg.sender].totalSpent, internalPrice);
        
        userMinted[msg.sender][dropId] = true;
        
        emit NFTPurchased(tokenId, dropId, msg.sender, 0); // Price will be decrypted off-chain
        return tokenId;
    }
    
    function revealDrop(
        uint256 dropId,
        euint32 totalRarity
    ) public {
        require(vaultDrops[dropId].creator == msg.sender, "Only creator can reveal");
        require(block.timestamp >= vaultDrops[dropId].revealTime, "Reveal time not reached");
        require(!vaultDrops[dropId].isRevealed, "Drop already revealed");
        
        vaultDrops[dropId].isRevealed = true;
        vaultDrops[dropId].rarity = totalRarity;
        
        emit DropRevealed(dropId, 0); // Rarity will be decrypted off-chain
    }
    
    function verifyUser(address user, bool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify users");
        require(user != address(0), "Invalid user address");
        
        if (userProfiles[user].userAddress == address(0)) {
            userProfiles[user] = UserProfile({
                totalMints: FHE.asEuint32(0),
                totalSpent: FHE.asEuint32(0),
                reputation: FHE.asEuint32(0),
                isVerified: isVerified,
                userAddress: user
            });
        } else {
            userProfiles[user].isVerified = isVerified;
        }
        
        emit UserVerified(user, isVerified);
    }
    
    function updateReputation(address user, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        if (userProfiles[user].userAddress == address(0)) {
            userProfiles[user] = UserProfile({
                totalMints: FHE.asEuint32(0),
                totalSpent: FHE.asEuint32(0),
                reputation: reputation,
                isVerified: false,
                userAddress: user
            });
        } else {
            userProfiles[user].reputation = reputation;
        }
        
        emit ReputationUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getDropInfo(uint256 dropId) public view returns (
        string memory name,
        string memory description,
        string memory imageUri,
        uint8 totalSupply,
        uint8 currentSupply,
        uint8 price,
        uint8 rarity,
        bool isActive,
        bool isRevealed,
        address creator,
        uint256 startTime,
        uint256 endTime,
        uint256 revealTime
    ) {
        VaultDrop storage drop = vaultDrops[dropId];
        return (
            drop.name,
            drop.description,
            drop.imageUri,
            0, // FHE.decrypt(drop.totalSupply) - will be decrypted off-chain
            0, // FHE.decrypt(drop.currentSupply) - will be decrypted off-chain
            0, // FHE.decrypt(drop.price) - will be decrypted off-chain
            0, // FHE.decrypt(drop.rarity) - will be decrypted off-chain
            drop.isActive,
            drop.isRevealed,
            drop.creator,
            drop.startTime,
            drop.endTime,
            drop.revealTime
        );
    }
    
    function getNFTInfo(uint256 tokenId) public view returns (
        uint8 dropId,
        uint8 rarity,
        bool isRevealed,
        address owner,
        uint256 mintTime
    ) {
        NFT storage nft = nfts[tokenId];
        return (
            0, // FHE.decrypt(nft.dropId) - will be decrypted off-chain
            0, // FHE.decrypt(nft.rarity) - will be decrypted off-chain
            nft.isRevealed,
            nft.owner,
            nft.mintTime
        );
    }
    
    function getUserProfile(address user) public view returns (
        uint8 totalMints,
        uint8 totalSpent,
        uint8 reputation,
        bool isVerified
    ) {
        UserProfile storage profile = userProfiles[user];
        return (
            0, // FHE.decrypt(profile.totalMints) - will be decrypted off-chain
            0, // FHE.decrypt(profile.totalSpent) - will be decrypted off-chain
            0, // FHE.decrypt(profile.reputation) - will be decrypted off-chain
            profile.isVerified
        );
    }
    
    function withdrawFunds(uint256 dropId) public {
        require(vaultDrops[dropId].creator == msg.sender, "Only creator can withdraw");
        require(vaultDrops[dropId].isRevealed, "Drop must be revealed");
        require(block.timestamp > vaultDrops[dropId].endTime, "Drop must be ended");
        
        // Transfer funds to creator
        // Note: In a real implementation, funds would be transferred based on decrypted amount
        vaultDrops[dropId].isActive = false;
        
        // For now, we'll transfer a placeholder amount
        // payable(msg.sender).transfer(amount);
    }
}
