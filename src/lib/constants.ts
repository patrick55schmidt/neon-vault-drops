// Contract constants and configuration

// Contract address - Replace with your deployed contract address
export const NEON_VAULT_DROPS_ADDRESS = '0x0000000000000000000000000000000000000000';

// Contract ABI for NeonVaultDrops
export const NEON_VAULT_DROPS_ABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_metadataHash",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_totalNfts",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "_price",
        "type": "bytes"
      },
      {
        "internalType": "uint256",
        "name": "_duration",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "inputProof",
        "type": "bytes"
      }
    ],
    "name": "createNftDrop",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_dropId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "_encryptedPricePaid",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "inputProof",
        "type": "bytes"
      }
    ],
    "name": "mintNft",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "_reputation",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "inputProof",
        "type": "bytes"
      }
    ],
    "name": "updateReputation",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_dropId",
        "type": "uint256"
      }
    ],
    "name": "getDropInfo",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "metadataHash",
        "type": "string"
      },
      {
        "internalType": "uint8",
        "name": "totalNfts",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "mintedNfts",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "price",
        "type": "uint8"
      },
      {
        "internalType": "bool",
        "name": "isActive",
        "type": "bool"
      },
      {
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "startTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "endTime",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "dropCounter",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "mintCounter",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "dropId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      }
    ],
    "name": "NftDropCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "mintId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "dropId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "minter",
        "type": "address"
      }
    ],
    "name": "NftMinted",
    "type": "event"
  }
] as const;

// Network configuration
export const NETWORK_CONFIG = {
  chainId: 11155111, // Sepolia
  name: 'Sepolia',
  rpcUrl: 'https://1rpc.io/sepolia',
  blockExplorer: 'https://sepolia.etherscan.io'
};

// Default values
export const DEFAULT_VALUES = {
  GAS_LIMIT: 500000,
  GAS_PRICE: '20000000000', // 20 gwei
  MAX_RETRIES: 3
};
