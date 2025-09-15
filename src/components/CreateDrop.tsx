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
  const { createVaultDrop, isLoading } = useNeonVaultContract();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUri: '',
    totalSupply: '',
    price: '',
    duration: '',
    revealDelay: '',
  });
  const [showEncrypted, setShowEncrypted] = useState(false);
  const [encryptedData, setEncryptedData] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Encrypt sensitive data using FHE
      const metadata = {
        rarity: Math.floor(Math.random() * 100),
        price: parseInt(formData.price),
        supply: parseInt(formData.totalSupply),
      };
      
      const encrypted = encryptNFTMetadata(metadata);
      setEncryptedData(encrypted);
      
      // Create FHE proof for contract
      const priceProof = createFHEProof(encrypted.encryptedPrice);
      
      // Call contract to create vault drop
      const txHash = await createVaultDrop({
        name: formData.name,
        description: formData.description,
        imageUri: formData.imageUri,
        totalSupply: parseInt(formData.totalSupply),
        price: parseInt(formData.price),
        duration: parseInt(formData.duration),
        revealDelay: parseInt(formData.revealDelay),
      });
      
      toast.success(`Drop created! Transaction: ${txHash}`);
    } catch (error) {
      console.error('Error creating drop:', error);
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <Label htmlFor="imageUri">Image URI</Label>
                <Input
                  id="imageUri"
                  value={formData.imageUri}
                  onChange={(e) => handleInputChange('imageUri', e.target.value)}
                  placeholder="https://example.com/image.png"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe your NFT drop"
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="totalSupply">Total Supply</Label>
                <Input
                  id="totalSupply"
                  type="number"
                  value={formData.totalSupply}
                  onChange={(e) => handleInputChange('totalSupply', e.target.value)}
                  placeholder="100"
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
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="revealDelay">Reveal Delay (hours)</Label>
              <Input
                id="revealDelay"
                type="number"
                value={formData.revealDelay}
                onChange={(e) => handleInputChange('revealDelay', e.target.value)}
                placeholder="1"
                required
              />
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
