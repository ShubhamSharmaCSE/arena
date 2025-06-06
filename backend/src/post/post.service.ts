import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { User } from '../entities/user.entity';
import { Like } from '../entities/like.entity';
import { Comment } from '../entities/comment.entity';
import { CreatePostDto, PostResponseDto } from '../dtos/post.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly userService: UserService,
  ) {}

  async create(walletAddress: string, createPostDto: CreatePostDto): Promise<Post> {
    // Ensure the user exists
    await this.userService.findOneOrCreate(walletAddress);

    const post = this.postRepository.create({
      wallet_address: walletAddress,
      content: createPostDto.content,
    });

    return this.postRepository.save(post);
  }

  async findAll(currentWalletAddress?: string): Promise<PostResponseDto[]> {
    const posts = await this.postRepository.find({
      relations: ['user'],
      order: {
        timestamp: 'DESC',
      },
    });

    const postsWithCounts = await Promise.all(
      posts.map(async (post) => {
        const likesCount = await this.likeRepository.count({
          where: { post_id: post.id },
        });

        const commentsCount = await this.commentRepository.count({
          where: { post_id: post.id },
        });

        let isLiked = false;
        if (currentWalletAddress) {
          const like = await this.likeRepository.findOne({
            where: { post_id: post.id, wallet_address: currentWalletAddress },
          });
          isLiked = !!like;
        }

        const postDto: PostResponseDto = {
          id: post.id,
          wallet_address: post.wallet_address,
          content: post.content,
          timestamp: post.timestamp,
          username: post.user?.username,
          profilePicUrl: post.user?.profilePicUrl,
          likesCount,
          commentsCount,
          isLiked,
        };

        return postDto;
      })
    );

    return postsWithCounts;
  }

  async findOne(id: string, currentWalletAddress?: string): Promise<PostResponseDto> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    const likesCount = await this.likeRepository.count({
      where: { post_id: post.id },
    });

    const commentsCount = await this.commentRepository.count({
      where: { post_id: post.id },
    });

    let isLiked = false;
    if (currentWalletAddress) {
      const like = await this.likeRepository.findOne({
        where: { post_id: post.id, wallet_address: currentWalletAddress },
      });
      isLiked = !!like;
    }

    const postDto: PostResponseDto = {
      id: post.id,
      wallet_address: post.wallet_address,
      content: post.content,
      timestamp: post.timestamp,
      username: post.user?.username,
      profilePicUrl: post.user?.profilePicUrl,
      likesCount,
      commentsCount,
      isLiked,
    };

    return postDto;
  }

  async likePost(postId: string, walletAddress: string): Promise<void> {
    const post = await this.postRepository.findOne({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    // Check if the post is already liked by this user
    const existingLike = await this.likeRepository.findOne({
      where: { post_id: postId, wallet_address: walletAddress },
    });

    if (existingLike) {
      // If already liked, unlike by removing the entry
      await this.likeRepository.remove(existingLike);
    } else {
      // Create a new like
      const like = this.likeRepository.create({
        post_id: postId,
        wallet_address: walletAddress,
      });
      await this.likeRepository.save(like);
    }
  }
}
