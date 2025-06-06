import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from '../dtos/comment.dto';
import { Request } from 'express';

@Controller('posts')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':id/comment')
  async create(
    @Param('id') postId: string,
    @Body() createCommentDto: CreateCommentDto,
    @Req() req: Request,
  ) {
    const walletAddress = req['walletAddress'];
    createCommentDto.post_id = postId;
    return this.commentService.create(walletAddress, createCommentDto);
  }

  @Get(':id/comments')
  async findByPostId(@Param('id') postId: string) {
    return this.commentService.findByPostId(postId);
  }
}
