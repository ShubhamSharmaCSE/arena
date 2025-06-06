import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(280)
  content: string;
}

export class PostResponseDto {
  id: string;
  wallet_address: string;
  content: string;
  timestamp: Date;
  username?: string;
  profilePicUrl?: string;
  likesCount: number;
  commentsCount: number;
  isLiked?: boolean;
}
