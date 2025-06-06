import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { VerifySignatureDto } from '../dtos/auth.dto';

@Injectable()
export class AuthService {
  async verifySignature(verifySignatureDto: VerifySignatureDto): Promise<boolean> {
    const { walletAddress, signature, message } = verifySignatureDto;
    
    try {
      // Recover the address from the signature
      const signerAddr = ethers.utils.verifyMessage(message, signature);
      
      // Check if the recovered address matches the claimed wallet address
      return signerAddr.toLowerCase() === walletAddress.toLowerCase();
    } catch (error) {
      console.error('Signature verification failed:', error);
      return false;
    }
  }
}
