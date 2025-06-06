import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { EntitiesModule } from '../entities/entities.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [EntitiesModule, UserModule],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
