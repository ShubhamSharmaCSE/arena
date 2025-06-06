import { IsString, IsOptional, IsUrl, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  wallet_address: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  username?: string;

  @IsString()
  @IsOptional()
  @MaxLength(160)
  bio?: string;

  @IsUrl()
  @IsOptional()
  profilePicUrl?: string;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MaxLength(50)
  username?: string;

  @IsString()
  @IsOptional()
  @MaxLength(160)
  bio?: string;

  @IsUrl()
  @IsOptional()
  profilePicUrl?: string;
}
