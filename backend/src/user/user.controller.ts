import { Controller, Get, Post, Body, Param, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from '../dtos/user.dto';
import { Request } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':wallet')
  async findOne(@Param('wallet') walletAddress: string) {
    const user = await this.userService.findOneOrCreate(walletAddress);
    return user;
  }

  @Post()
  async update(@Body() updateUserDto: UpdateUserDto, @Req() req: Request) {
    // Extract wallet address from the authenticated request
    const walletAddress = req['walletAddress'];
    return this.userService.update(walletAddress, updateUserDto);
  }
}
