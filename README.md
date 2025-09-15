<div align="center">

# 🌟 Neon Vault Drops

### *Where Privacy Meets Digital Art*

[![FHE Powered](https://img.shields.io/badge/FHE-Powered-00D4FF?style=for-the-badge&logo=zama&logoColor=white)](https://zama.ai)
[![Ethereum](https://img.shields.io/badge/Ethereum-Sepolia-627EEA?style=for-the-badge&logo=ethereum&logoColor=white)](https://sepolia.etherscan.io)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)

*Experience the future of NFT privacy with fully homomorphic encrypted mystery drops*

</div>

---

## 🔐 What Makes Us Different?

Unlike traditional NFT platforms where metadata is visible before reveal, **Neon Vault Drops** leverages Zama's cutting-edge FHE technology to keep everything encrypted until the moment of truth. Your mystery NFTs remain truly mysterious until reveal events.

## ✨ Core Features

<table>
<tr>
<td width="50%">

### 🔒 **FHE-Powered Privacy**
- All NFT metadata encrypted with Zama's FHE
- Zero-knowledge until reveal events
- True privacy preservation

### 🎲 **Mystery Drops**
- Create encrypted NFT collections
- Participate in mystery drops
- Fair distribution guaranteed

</td>
<td width="50%">

### 💼 **Multi-Wallet Support**
- MetaMask integration
- WalletConnect compatibility
- Rainbow wallet support

### 🏆 **Reputation System**
- User verification system
- Trust score tracking
- Community governance

</td>
</tr>
</table>

## Technology Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Blockchain**: Ethereum, Wagmi, RainbowKit
- **FHE**: Zama's FHE technology for encrypted computations
- **Smart Contracts**: Solidity with FHE support

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/patrick55schmidt/neon-vault-drops.git
cd neon-vault-drops
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_WALLETCONNECT_PROJECT_ID
NEXT_PUBLIC_INFURA_API_KEY=YOUR_INFURA_KEY
```

## Smart Contract Deployment

### Prerequisites

- Hardhat
- Ethereum wallet with Sepolia ETH

### Deploy to Sepolia

1. Install Hardhat dependencies:
```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
```

2. Configure your private key in `hardhat.config.js`

3. Deploy the contract:
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

## Project Structure

```
neon-vault-drops/
├── contracts/           # Smart contracts
│   └── NeonVaultDrops.sol
├── scripts/            # Deployment scripts
│   └── deploy.js
├── src/
│   ├── components/     # React components
│   ├── lib/           # Utilities and configurations
│   ├── pages/         # Page components
│   └── hooks/         # Custom React hooks
├── public/            # Static assets
└── docs/              # Documentation
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Zama](https://zama.ai/) for FHE technology
- [RainbowKit](https://rainbowkit.com/) for wallet integration
- [shadcn/ui](https://ui.shadcn.com/) for UI components
