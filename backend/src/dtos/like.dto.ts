import { IsNotEmpty, IsUUID } from 'class-validator';

export class LikePostDto {
  @IsUUID()
  @IsNotEmpty()
  post_id: string;
}
