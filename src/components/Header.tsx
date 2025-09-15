import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

const Header = () => {
  const { address, isConnected } = useAccount();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold gradient-neon bg-clip-text text-transparent">
              Neon Vault Drops
            </div>
            <div className="hidden md:block text-sm text-muted-foreground">
              FHE-Powered NFT Platform
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#drops" className="text-foreground hover:text-primary transition-colors">
              Active Drops
            </a>
            <a href="#collections" className="text-foreground hover:text-primary transition-colors">
              Collections
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">
              About
            </a>
          </nav>

          <ConnectButton 
            chainStatus="icon"
            accountStatus={{
              smallScreen: 'avatar',
              largeScreen: 'full',
            }}
            showBalance={{
              smallScreen: false,
              largeScreen: true,
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;