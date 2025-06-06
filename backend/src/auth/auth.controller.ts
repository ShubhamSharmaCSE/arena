import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { VerifySignatureDto } from '../dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('verify')
  async verifySignature(@Body() verifySignatureDto: VerifySignatureDto) {
    const isValid = await this.authService.verifySignature(verifySignatureDto);
    
    if (!isValid) {
      throw new UnauthorizedException('Invalid signature');
    }
    
    return { 
      success: true,
      walletAddress: verifySignatureDto.walletAddress 
    };
  }
}
