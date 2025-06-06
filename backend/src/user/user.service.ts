import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(walletAddress: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { wallet_address: walletAddress },
    });

    if (!user) {
      throw new NotFoundException(`User with wallet address ${walletAddress} not found`);
    }

    return user;
  }

  async findOneOrCreate(walletAddress: string): Promise<User> {
    try {
      return await this.findOne(walletAddress);
    } catch (error) {
      if (error instanceof NotFoundException) {
        const newUser = this.userRepository.create({ wallet_address: walletAddress });
        return this.userRepository.save(newUser);
      }
      throw error;
    }
  }

  async update(walletAddress: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOneOrCreate(walletAddress);
    
    // Update only the fields that are provided
    if (updateUserDto.username !== undefined) {
      user.username = updateUserDto.username;
    }
    if (updateUserDto.bio !== undefined) {
      user.bio = updateUserDto.bio;
    }
    if (updateUserDto.profilePicUrl !== undefined) {
      user.profilePicUrl = updateUserDto.profilePicUrl;
    }

    return this.userRepository.save(user);
  }
}
