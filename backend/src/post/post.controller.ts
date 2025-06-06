import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from '../dtos/post.dto';
import { LikePostDto } from '../dtos/like.dto';
import { Request } from 'express';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
    const walletAddress = req['walletAddress'];
    return this.postService.create(walletAddress, createPostDto);
  }

  @Get()
  async findAll(@Req() req: Request) {
    const walletAddress = req['walletAddress'];
    return this.postService.findAll(walletAddress);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: Request) {
    const walletAddress = req['walletAddress'];
    return this.postService.findOne(id, walletAddress);
  }

  @Post(':id/like')
  async likePost(@Param('id') id: string, @Req() req: Request) {
    const walletAddress = req['walletAddress'];
    await this.postService.likePost(id, walletAddress);
    return { success: true };
  }
}
