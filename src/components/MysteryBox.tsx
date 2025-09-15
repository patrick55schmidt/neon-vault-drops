import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, Lock, Users, Zap, Eye, Sparkles, Gift } from "lucide-react";
import { useState } from "react";
import { useNeonVaultContract } from "@/hooks/useContract";
import { useAccount } from "wagmi";
import { toast } from "sonner";

interface MysteryBoxProps {
  id: string;
  title: string;
  image: string;
  price: string;
  totalSupply: number;
  minted: number;
  revealDate: string;
  description: string;
}

const MysteryBox = ({
  id,
  title,
  image,
  price,
  totalSupply,
  minted,
  revealDate,
  description,
}: MysteryBoxProps) => {
  const [isMinting, setIsMinting] = useState(false);
  const { mintNft, isLoading } = useNeonVaultContract();
  const { isConnected } = useAccount();
  const progress = (minted / totalSupply) * 100;

  const handleMint = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet to mint NFT");
      return;
    }

    try {
      setIsMinting(true);
      
      // Convert drop ID to number (assuming id is a string representation of dropId)
      const dropId = parseInt(id);
      
      if (isNaN(dropId)) {
        throw new Error("Invalid drop ID");
      }

      // Convert price string to number
      const priceNumber = parseFloat(price);
      
      console.log(`Minting NFT for drop ${dropId} with price ${priceNumber} ETH`);
      
      // Call the real contract with FHE encrypted price
      const tx = await mintNft(dropId, priceNumber);
      
      console.log("NFT minted successfully:", tx);
      toast.success("NFT minted successfully! Check your wallet.");
      
    } catch (error: any) {
      console.error("Failed to mint NFT:", error);
      toast.error(`Failed to mint NFT: ${error.message || error.toString()}`);
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <Card className="group overflow-hidden bg-card border-primary/20 mystery-hover mystery-box-glow">
      <div className="relative">
        <div className="aspect-square overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        </div>
        
        {/* Encrypted Overlay */}
        <div className="absolute top-4 right-4 bg-accent/90 backdrop-blur-sm rounded-full p-2 neon-glow-pink">
          <Eye className="w-4 h-4 text-accent-foreground" />
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
          <div 
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold mb-2 gradient-neon bg-clip-text text-transparent">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Price:</span>
            <span className="font-semibold text-primary">{price} ETH</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-secondary" />
            <span className="text-muted-foreground">Supply:</span>
            <span className="font-semibold">{minted}/{totalSupply}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-accent" />
          <span className="text-muted-foreground">Reveal:</span>
          <span className="font-semibold text-accent">{revealDate}</span>
        </div>

        <div className="pt-4">
          <Button
            variant="neon"
            className="w-full"
            onClick={handleMint}
            disabled={isMinting || minted >= totalSupply}
          >
            {isMinting ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                Minting...
              </>
            ) : minted >= totalSupply ? (
              "Sold Out"
            ) : (
              <>
                <Gift className="w-4 h-4 mr-2" />
                Mint Mystery NFT
              </>
            )}
          </Button>
        </div>

        <div className="text-xs text-muted-foreground text-center pt-2 flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3" />
          Contents encrypted until reveal event
        </div>
      </div>
    </Card>
  );
};

export default MysteryBox;