import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useNeonVaultContract } from '@/hooks/useContract';
import { encryptNFTMetadata, createFHEProof } from '@/lib/fhe';
import { toast } from 'sonner';
import { Shield, Lock, Eye, EyeOff } from 'lucide-react';

export const CreateDrop = () => {
  const { createNftDrop, isLoading } = useNeonVaultContract();
  const [formData, setFormData] = useState({
    name: '',
    metadataHash: '',
    totalNfts: '',
    price: '',
    duration: '',
  });
  const [showEncrypted, setShowEncrypted] = useState(false);
  const [encryptedData, setEncryptedData] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Encrypt sensitive data using FHE
      const metadata = {
        rarity: Math.floor(Math.random() * 100),
        price: parseFloat(formData.price),
        supply: parseInt(formData.totalNfts),
      };
      
      const encrypted = encryptNFTMetadata(metadata);
      setEncryptedData(encrypted);
      
      // Create FHE proof for contract
      const priceProof = createFHEProof(encrypted.encryptedPrice);
      
      // Call contract to create NFT drop
      const txHash = await createNftDrop({
        name: formData.name,
        metadataHash: formData.metadataHash,
        totalNfts: parseInt(formData.totalNfts),
        price: parseFloat(formData.price),
        duration: parseInt(formData.duration) * 3600, // Convert hours to seconds
      });
      
      toast.success(`NFT Drop created! Transaction: ${txHash}`);
      
      // Reset form
      setFormData({
        name: '',
        metadataHash: '',
        totalNfts: '',
        price: '',
        duration: '',
      });
      setEncryptedData(null);
    } catch (error: any) {
      console.error('Error creating drop:', error);
      toast.error(`Failed to create drop: ${error.message || error.toString()}`);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            Create FHE-Encrypted Vault Drop
          </CardTitle>
          <CardDescription>
            Create a mystery NFT drop with fully homomorphic encrypted metadata
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Drop Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter drop name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="metadataHash">Metadata Hash (IPFS)</Label>
                <Input
                  id="metadataHash"
                  value={formData.metadataHash}
                  onChange={(e) => handleInputChange('metadataHash', e.target.value)}
                  placeholder="Qm... (IPFS hash of encrypted metadata)"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="totalNfts">Total NFTs</Label>
                  <Input
                    id="totalNfts"
                    type="number"
                    value={formData.totalNfts}
                    onChange={(e) => handleInputChange('totalNfts', e.target.value)}
                    placeholder="100"
                    min="1"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price">Price (ETH)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.001"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="0.01"
                    min="0"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (hours)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    placeholder="24"
                    min="1"
                    required
                  />
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? 'Creating Drop...' : 'Create Encrypted Drop'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {encryptedData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-green-400" />
              FHE-Encrypted Data
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowEncrypted(!showEncrypted)}
              >
                {showEncrypted ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </CardTitle>
            <CardDescription>
              Sensitive data encrypted using fully homomorphic encryption
            </CardDescription>
          </CardHeader>
          <CardContent>
            {showEncrypted ? (
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-muted rounded">
                  <strong>Encrypted Price:</strong> {encryptedData.encryptedPrice.ciphertext}
                </div>
                <div className="p-2 bg-muted rounded">
                  <strong>Encrypted Supply:</strong> {encryptedData.encryptedSupply.ciphertext}
                </div>
                <div className="p-2 bg-muted rounded">
                  <strong>Encrypted Rarity:</strong> {encryptedData.encryptedRarity.ciphertext}
                </div>
                <div className="p-2 bg-muted rounded">
                  <strong>FHE Proof:</strong> {createFHEProof(encryptedData.encryptedPrice)}
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                <Lock className="w-8 h-8 mx-auto mb-2" />
                <p>Data encrypted and ready for blockchain submission</p>
                <p className="text-xs">Click the eye icon to view encrypted data</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
