import { useReadContract, useWriteContract, useAccount } from 'wagmi';
import { useState } from 'react';
import { toast } from 'sonner';
import { NEON_VAULT_DROPS_ABI, NEON_VAULT_DROPS_ADDRESS } from '@/lib/constants';
import { encryptDataForContract } from '@/lib/fhe';
import { ethers } from 'ethers';

export const useNeonVaultContract = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { address } = useAccount();

  const { writeContractAsync: writeContract } = useWriteContract();

  // Create NFT Drop with FHE encrypted price
  const createNftDrop = async (dropData: {
    name: string;
    metadataHash: string;
    totalNfts: number;
    price: number;
    duration: number;
  }) => {
    try {
      setIsLoading(true);
      setError(null);

      if (!address) {
        throw new Error('Please connect your wallet');
      }

      // Encrypt the price using FHE
      const encryptedPriceData = await encryptDataForContract(dropData.price);
      
      console.log('Creating NFT drop with encrypted price:', {
        name: dropData.name,
        price: dropData.price,
        encryptedValue: encryptedPriceData.encryptedValue,
        proof: encryptedPriceData.inputProof
      });

      const tx = await writeContract({
        address: NEON_VAULT_DROPS_ADDRESS,
        abi: NEON_VAULT_DROPS_ABI,
        functionName: 'createNftDrop',
        args: [
          dropData.name,
          dropData.metadataHash,
          BigInt(dropData.totalNfts),
          encryptedPriceData.encryptedValue, // FHE encrypted price
          BigInt(dropData.duration),
          encryptedPriceData.inputProof // FHE proof
        ],
      });

      toast.success(`NFT Drop "${dropData.name}" created successfully!`);
      console.log('NFT Drop created, transaction hash:', tx);
      return tx;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to create NFT drop';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Error creating NFT drop:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Mint NFT with FHE encrypted price payment
  const mintNft = async (dropId: number, price: number) => {
    try {
      setIsLoading(true);
      setError(null);

      if (!address) {
        throw new Error('Please connect your wallet');
      }

      // Encrypt the price payment using FHE
      const encryptedPriceData = await encryptDataForContract(price);
      
      console.log('Minting NFT with encrypted price payment:', {
        dropId,
        price,
        encryptedValue: encryptedPriceData.encryptedValue,
        proof: encryptedPriceData.inputProof
      });

      const tx = await writeContract({
        address: NEON_VAULT_DROPS_ADDRESS,
        abi: NEON_VAULT_DROPS_ABI,
        functionName: 'mintNft',
        args: [
          BigInt(dropId),
          encryptedPriceData.encryptedValue, // FHE encrypted price paid
          encryptedPriceData.inputProof // FHE proof
        ],
        value: ethers.parseEther(price.toString()), // Send actual ETH
      });

      toast.success('NFT minted successfully!');
      console.log('NFT minted, transaction hash:', tx);
      return tx;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to mint NFT';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Error minting NFT:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Update user reputation with FHE encryption
  const updateReputation = async (userAddress: string, reputation: number) => {
    try {
      setIsLoading(true);
      setError(null);

      if (!address) {
        throw new Error('Please connect your wallet');
      }

      // Encrypt the reputation using FHE
      const encryptedReputationData = await encryptDataForContract(reputation);
      
      console.log('Updating reputation with encrypted data:', {
        userAddress,
        reputation,
        encryptedValue: encryptedReputationData.encryptedValue,
        proof: encryptedReputationData.inputProof
      });

      const tx = await writeContract({
        address: NEON_VAULT_DROPS_ADDRESS,
        abi: NEON_VAULT_DROPS_ABI,
        functionName: 'updateReputation',
        args: [
          userAddress,
          encryptedReputationData.encryptedValue, // FHE encrypted reputation
          encryptedReputationData.inputProof // FHE proof
        ],
      });

      toast.success('Reputation updated successfully!');
      console.log('Reputation updated, transaction hash:', tx);
      return tx;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to update reputation';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Error updating reputation:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Get drop information
  const getDropInfo = (dropId: number) => {
    return useReadContract({
      address: NEON_VAULT_DROPS_ADDRESS,
      abi: NEON_VAULT_DROPS_ABI,
      functionName: 'getDropInfo',
      args: [BigInt(dropId)],
    });
  };

  // Get drop counter
  const getDropCounter = () => {
    return useReadContract({
      address: NEON_VAULT_DROPS_ADDRESS,
      abi: NEON_VAULT_DROPS_ABI,
      functionName: 'dropCounter',
    });
  };

  // Get mint counter
  const getMintCounter = () => {
    return useReadContract({
      address: NEON_VAULT_DROPS_ADDRESS,
      abi: NEON_VAULT_DROPS_ABI,
      functionName: 'mintCounter',
    });
  };

  // Get user reputation
  const getUserReputation = (userAddress: string) => {
    return useReadContract({
      address: NEON_VAULT_DROPS_ADDRESS,
      abi: NEON_VAULT_DROPS_ABI,
      functionName: 'getUserReputation',
      args: [userAddress],
    });
  };

  return {
    // Write functions
    createNftDrop,
    mintNft,
    updateReputation,
    
    // Read functions
    getDropInfo,
    getDropCounter,
    getMintCounter,
    getUserReputation,
    
    // State
    isLoading,
    error,
    isConnected: !!address,
    userAddress: address,
  };
};