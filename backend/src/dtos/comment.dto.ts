import { IsString, IsNotEmpty, IsUUID, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @IsUUID()
  @IsNotEmpty()
  post_id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(280)
  content: string;
}

export class CommentResponseDto {
  id: string;
  post_id: string;
  wallet_address: string;
  content: string;
  timestamp: Date;
  username?: string;
  profilePicUrl?: string;
}
