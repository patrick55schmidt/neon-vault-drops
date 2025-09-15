import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Neon Vault Drops',
  projectId: '2ec9743d0d0cd7fb94dee1a7e6d33475', // WalletConnect Project ID
  chains: [sepolia],
  ssr: false, // If your dApp uses server side rendering (SSR)
});

export const supportedChains = [sepolia];
export const defaultChain = sepolia;
