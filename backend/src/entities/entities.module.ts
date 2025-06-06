import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';
import { Like } from './like.entity';
import { Comment } from './comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Post, Like, Comment]),
  ],
  exports: [TypeOrmModule],
})
export class EntitiesModule {}
