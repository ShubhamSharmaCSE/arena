import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { Post } from '../entities/post.entity';
import { UserService } from '../user/user.service';
import { CreateCommentDto, CommentResponseDto } from '../dtos/comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly userService: UserService,
  ) {}

  async create(walletAddress: string, createCommentDto: CreateCommentDto): Promise<Comment> {
    // Ensure the user exists
    await this.userService.findOneOrCreate(walletAddress);

    // Check if post exists
    const post = await this.postRepository.findOne({
      where: { id: createCommentDto.post_id },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${createCommentDto.post_id} not found`);
    }

    const comment = this.commentRepository.create({
      post_id: createCommentDto.post_id,
      wallet_address: walletAddress,
      content: createCommentDto.content,
    });

    return this.commentRepository.save(comment);
  }

  async findByPostId(postId: string): Promise<CommentResponseDto[]> {
    const comments = await this.commentRepository.find({
      where: { post_id: postId },
      relations: ['user'],
      order: {
        timestamp: 'ASC',
      },
    });

    return comments.map(comment => ({
      id: comment.id,
      post_id: comment.post_id,
      wallet_address: comment.wallet_address,
      content: comment.content,
      timestamp: comment.timestamp,
      username: comment.user?.username,
      profilePicUrl: comment.user?.profilePicUrl,
    }));
  }
}
