import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // Get the authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }

    // Extract the signature part
    const token = authHeader.split(' ')[1];
    
    try {
      // Extract wallet address from request
      const walletAddress = req.headers['x-wallet-address'] as string;
      if (!walletAddress) {
        throw new UnauthorizedException('No wallet address provided');
      }

      // Verify the signature
      // Note: In a real-world scenario, you might want to use JWT or some other token
      // strategy that doesn't require sending the signature in each request
      const isValid = await this.authService.verifySignature({
        walletAddress,
        signature: token,
        message: 'Login to Decentralized Social Media', // This should match what the frontend requests signing
      });

      if (!isValid) {
        throw new UnauthorizedException('Invalid token');
      }

      // If valid, attach the wallet address to the request object for controllers to use
      req['walletAddress'] = walletAddress;
      next();
    } catch (error) {
      throw new UnauthorizedException('Authentication failed');
    }
  }
}
